using System.Data;

namespace WorkItems.API.Models;

public class workItem
{
    public int Id { get; set;}
    public string Title { get; set;} = "";
    public WorkItemStatus Status { get; set;} =WorkItemStatus.Open;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    
}