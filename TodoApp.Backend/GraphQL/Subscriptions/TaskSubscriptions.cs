using HotChocolate;
using HotChocolate.Types;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL.Subscriptions;

[ExtendObjectType("Subscription")]
public class TaskSubscriptions
{
    [Subscribe]
    public Task<Task> TaskCreated([EventMessage] Task task) => Task.FromResult(task);

    [Subscribe]
    public Task<Task> TaskUpdated([EventMessage] Task task) => Task.FromResult(task);

    [Subscribe]
    public Task<int> TaskDeleted([EventMessage] int taskId) => Task.FromResult(taskId);
}
