namespace WorkItems.API.Models;

public class WorkItem
{
    public int Id { get; set;}
    public string Title { get; set;} = "";
    public WorkItemStatus Status { get; set;} =WorkItemStatus.Open;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}