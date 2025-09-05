using System.ComponentModel.DataAnnotations;

namespace Todo.Api.Models;

public enum TaskStatus
{
    Pending = 0,
    Completed = 1
}

public class TaskItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }

    public TaskStatus Status { get; set; } = TaskStatus.Pending;
}

