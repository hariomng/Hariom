using Microsoft.EntityFrameworkCore;
using TodoApp.Backend.Data;
using TodoApp.Backend.GraphQL.Inputs;
using TodoApp.Backend.GraphQL.Mutations;
using TodoApp.Backend.GraphQL.Queries;
using TodoApp.Backend.GraphQL.Subscriptions;
using TodoApp.Backend.GraphQL.Types;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services
    .AddGraphQLServer()
    .AddQueryType<TaskQueries>()
    .AddMutationType<TaskMutations>()
    .AddSubscriptionType<TaskSubscriptions>()
    .AddType<TaskType>()
    .AddType<TaskStatusType>()
    .AddType<CreateTaskInputType>()
    .AddType<UpdateTaskStatusInputType>()
    .AddInMemorySubscriptions()
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .AddDefaultTransactionScopeHandler();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowReactApp");
app.UseWebSockets();
app.UseRouting();

app.MapGraphQL();

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
    context.Database.EnsureCreated();
}

app.Run();
