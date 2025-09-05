using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;

namespace Todo.Api;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
    }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
}

