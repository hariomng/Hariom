using Microsoft.EntityFrameworkCore;
using Todo.Api;
using Todo.Api.GraphQL;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default") ??
                      "Data Source=todo.db"));
builder.Services.AddPooledDbContextFactory<TodoDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default") ??
                      "Data Source=todo.db"));

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>()
    .AddInMemorySubscriptions()
    .AddFiltering()
    .AddSorting();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

app.UseWebSockets();
app.UseCors("AllowAll");

app.MapGraphQL("/graphql");

// Ensure DB created and apply migrations if any
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
    db.Database.EnsureCreated();
}

app.Run();
