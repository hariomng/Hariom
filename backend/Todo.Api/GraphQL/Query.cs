using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Todo.Api.Models;

namespace Todo.Api.GraphQL;

public class Query
{
    [UseFiltering]
    [UseSorting]
    public IQueryable<TaskItem> GetAllTasks([Service(ServiceKind.Pooled)] TodoDbContext db)
        => db.Tasks.AsQueryable();
}

