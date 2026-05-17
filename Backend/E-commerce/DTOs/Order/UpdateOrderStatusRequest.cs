using E_commerce.Models;

namespace E_commerce.DTOs.Order
{
    public class UpdateOrderStatusRequest
    {
        public OrderStatus OrderStatus { get; set; }
    }
}
