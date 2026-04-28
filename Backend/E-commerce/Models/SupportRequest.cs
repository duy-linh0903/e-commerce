using System;

namespace E_commerce.Models
{
public class SupportRequest
{
    public int Id { get; set; }

    public int UserId { get; set; }  
    public User User { get; set; }

    public string Title { get; set; } 
    public string Message { get; set; }

    public string Status { get; set; } = "Pending"; 
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
}