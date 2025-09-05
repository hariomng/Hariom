using HotChocolate;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;

namespace Todo.Api.GraphQL;

public class Mutation
{
    public async Task<TaskItem> CreateTask(
        string title,
        string? description,
        [Service] IDbContextFactory<TodoDbContext> dbFactory,
        [Service] ITopicEventSender sender,
        CancellationToken cancellationToken)
    {
        await using var db = await dbFactory.CreateDbContextAsync(cancellationToken);
        var task = new TaskItem { Title = title, Description = description, Status = Todo.Api.Models.TaskStatus.Pending };
        db.Tasks.Add(task);
        await db.SaveChangesAsync(cancellationToken);
        await sender.SendAsync(nameof(Subscription.OnTaskCreated), task, cancellationToken);
        return task;
    }

    public async Task<TaskItem?> UpdateTaskStatus(
        int id,
        Todo.Api.Models.TaskStatus status,
        [Service] IDbContextFactory<TodoDbContext> dbFactory,
        [Service] ITopicEventSender sender,
        CancellationToken cancellationToken)
    {
        await using var db = await dbFactory.CreateDbContextAsync(cancellationToken);
        var task = await db.Tasks.FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
        if (task is null)
        {
            return null;
        }
        task.Status = status;
        await db.SaveChangesAsync(cancellationToken);
        await sender.SendAsync(nameof(Subscription.OnTaskUpdated), task, cancellationToken);
        return task;
    }
}

