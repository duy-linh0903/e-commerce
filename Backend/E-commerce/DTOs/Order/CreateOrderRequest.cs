using E_commerce.Models;
using System.ComponentModel.DataAnnotations;

namespace E_commerce.DTOs.Order

{
    public class CreateOrderRequest
    {
        [Required(ErrorMessage = "Shipping Address is required.")]
        [StringLength(255)]
        public string ShippingAddress { get; set; } = null!;
        [Required(ErrorMessage = "PaymentMethodId is required.")]
        public Guid PaymentMethodId { get; set; }
        public string? VoucherCode { get; set; }

    }
}