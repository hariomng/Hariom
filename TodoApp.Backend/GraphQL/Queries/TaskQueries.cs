using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using TodoApp.Backend.Data;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL.Queries;

[ExtendObjectType("Query")]
public class TaskQueries
{
    [UseDbContext(typeof(TodoDbContext))]
    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Task> GetAllTasks([ScopedService] TodoDbContext context)
    {
        return context.Tasks;
    }

    [UseDbContext(typeof(TodoDbContext))]
    public async Task<Task?> GetTaskById(int id, [ScopedService] TodoDbContext context)
    {
        return await context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
    }
}
