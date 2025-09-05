using HotChocolate;
using HotChocolate.Types;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL.Inputs;

public record UpdateTaskStatusInput(
    int Id,
    TaskStatus Status
);

public class UpdateTaskStatusInputType : InputObjectType<UpdateTaskStatusInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<UpdateTaskStatusInput> descriptor)
    {
        descriptor.Description("Input for updating a task's status");
        
        descriptor
            .Field(t => t.Id)
            .Description("The unique identifier of the task")
            .Type<NonNullType<IntType>>();
            
        descriptor
            .Field(t => t.Status)
            .Description("The new status of the task")
            .Type<NonNullType<TaskStatusType>>();
    }
}
