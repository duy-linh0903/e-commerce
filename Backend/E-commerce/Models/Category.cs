using System.ComponentModel.DataAnnotations;

namespace E_commerce.Models
{
    public class Category
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; } 
    }
}
