using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using Todo.Api.Models;

namespace Todo.Api.GraphQL;

public class Subscription
{
    [Subscribe]
    [Topic]
    public TaskItem OnTaskCreated([EventMessage] TaskItem task) => task;

    [Subscribe]
    [Topic]
    public TaskItem OnTaskUpdated([EventMessage] TaskItem task) => task;
}

