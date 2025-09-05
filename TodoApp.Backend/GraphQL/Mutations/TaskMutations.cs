using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using TodoApp.Backend.Data;
using TodoApp.Backend.GraphQL.Inputs;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL.Mutations;

[ExtendObjectType("Mutation")]
public class TaskMutations
{
    [UseDbContext(typeof(TodoDbContext))]
    public async Task<Task> CreateTask(
        CreateTaskInput input,
        [ScopedService] TodoDbContext context,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var task = new Task
        {
            Title = input.Title,
            Description = input.Description,
            Status = TaskStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        context.Tasks.Add(task);
        await context.SaveChangesAsync(cancellationToken);

        // Send real-time update
        await eventSender.SendAsync("TaskCreated", task, cancellationToken);

        return task;
    }

    [UseDbContext(typeof(TodoDbContext))]
    public async Task<Task?> UpdateTaskStatus(
        UpdateTaskStatusInput input,
        [ScopedService] TodoDbContext context,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var task = await context.Tasks.FirstOrDefaultAsync(t => t.Id == input.Id, cancellationToken);
        
        if (task == null)
        {
            return null;
        }

        task.Status = input.Status;
        task.UpdatedAt = DateTime.UtcNow;

        await context.SaveChangesAsync(cancellationToken);

        // Send real-time update
        await eventSender.SendAsync("TaskUpdated", task, cancellationToken);

        return task;
    }

    [UseDbContext(typeof(TodoDbContext))]
    public async Task<bool> DeleteTask(
        int id,
        [ScopedService] TodoDbContext context,
        [Service] ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var task = await context.Tasks.FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
        
        if (task == null)
        {
            return false;
        }

        context.Tasks.Remove(task);
        await context.SaveChangesAsync(cancellationToken);

        // Send real-time update
        await eventSender.SendAsync("TaskDeleted", id, cancellationToken);

        return true;
    }
}
