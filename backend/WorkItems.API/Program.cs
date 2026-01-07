using Microsoft.EntityFrameworkCore;
using WorkItems.Api.Endpoint;
using WorkItems.API.Data;
using WorkItems.API.Models;

var builder = WebApplication.CreateBuilder(args);

//swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Database
builder.Services.AddDbContext<AppDbContext>(Options => 
    Options.UseSqlite("Data Source=workitems.db"));


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.MapHealthEndpoints();
//app.MapWorkItemEndpoints();
app.Run();