using HotChocolate;
using HotChocolate.Types;
using TodoApp.Backend.Models;

namespace TodoApp.Backend.GraphQL.Types;

public class TaskStatusType : EnumType<TaskStatus>
{
    protected override void Configure(IEnumTypeDescriptor<TaskStatus> descriptor)
    {
        descriptor.Description("The status of a task");
        
        descriptor
            .Value(TaskStatus.Pending)
            .Description("The task is pending completion");
            
        descriptor
            .Value(TaskStatus.Completed)
            .Description("The task has been completed");
    }
}
