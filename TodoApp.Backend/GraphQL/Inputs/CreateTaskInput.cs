using HotChocolate;
using HotChocolate.Types;

namespace TodoApp.Backend.GraphQL.Inputs;

public record CreateTaskInput(
    string Title,
    string? Description = null
);

public class CreateTaskInputType : InputObjectType<CreateTaskInput>
{
    protected override void Configure(IInputObjectTypeDescriptor<CreateTaskInput> descriptor)
    {
        descriptor.Description("Input for creating a new task");
        
        descriptor
            .Field(t => t.Title)
            .Description("The title of the task")
            .Type<NonNullType<StringType>>();
            
        descriptor
            .Field(t => t.Description)
            .Description("The description of the task")
            .Type<StringType>();
    }
}
