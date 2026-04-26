using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_commerce.Models
{
    public class Product
    {
        [Key] //Xác định primary key
        public Guid Id { get; set; } = Guid.NewGuid(); //guid là hệ thống tự động tạo Id
        [Required] //để yêu cầu điền thông tin (ko đc null)
        [StringLength(100)]//giới hạn độ dài nvarchar để tối ưu database
        public string Name { get; set; }
        [StringLength(200)]
        public string? Description { get; set; } // ? để cho bt là có thể null
        [Column(TypeName = "decimal(18,2)")] //định nghĩa cho decimal trong db
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        [Range(0, int.MaxValue)] //constrain giá trị không âm
        public int Quantity { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; } //virtual dùng để tạo lazyloading
                                                       //là khi nào cần thì mới tải về giúp tiết kiệm bộ nhớ và tối ưu thời gian
    }
}
