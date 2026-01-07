using Microsoft.EntityFrameworkCore;
using WorkItems.API.Models;

namespace WorkItems.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<workItem> WorkItems => Set<workItem>();
}