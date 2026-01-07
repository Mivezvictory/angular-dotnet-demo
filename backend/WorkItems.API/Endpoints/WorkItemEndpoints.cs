using Microsoft.EntityFrameworkCore;
using WorkItems.API.Contracts;
using WorkItems.API.Data;
using WorkItems.API.Models;

namespace WorkItems.Api.Endpoints;

public static class WorkItemEndpoints
{
    public static IEndpointRouteBuilder MapWorkItemEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/work-items")
            .WithTags("WorkItems");

        group.MapGet("", async (AppDbContext db) =>
        {
            var items = await db.WorkItems
                .OrderByDescending(x => x.CreatedAtUtc)
                .ToListAsync();

            return Results.Ok(items);
        });

        group.MapPost("", async (CreateWorkItemRequest request, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(request.Title))
                return Results.BadRequest(new { error = "Title is required." });

            var item = new WorkItem
            {
                Title = request.Title.Trim(),
                Status = WorkItemStatus.Open,
                CreatedAtUtc = DateTime.UtcNow
            };

            db.WorkItems.Add(item);
            await db.SaveChangesAsync();

            return Results.Created($"/api/work-items/{item.Id}", item);
        });

        group.MapPut("{id:int}/status", async (int id, UpdateStatusRequest request, AppDbContext db) =>
        {
            var item = await db.WorkItems.FindAsync(id);
            if (item is null) return Results.NotFound();

            if (!Enum.TryParse<WorkItemStatus>(request.Status, ignoreCase: true, out var parsed))
                return Results.BadRequest(new { error = "Invalid status. Use Open, InProgress, or Done." });

            item.Status = parsed;
            await db.SaveChangesAsync();

            return Results.Ok(item);
        });

        group.MapDelete("{id:int}", async (int id, AppDbContext db) =>
        {
            var item = await db.WorkItems.FindAsync(id);
            if (item is null) return Results.NotFound();

            db.WorkItems.Remove(item);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        return app;
    }
}
