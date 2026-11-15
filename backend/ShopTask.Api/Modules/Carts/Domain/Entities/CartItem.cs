using System.ComponentModel.DataAnnotations.Schema;
using ShopTask.Api.Modules.Carts.Domain.Exceptions;
using ShopTask.Api.Modules.Products.Domain.Entities;

namespace ShopTask.Api.Modules.Carts.Domain.Entities;

[Table("cart_items")]
public class CartItem
{
    private CartItem()
    {
    }

    internal CartItem(Product product, int quantity)
    {
        Product = product;
        ProductId = product.Id;
        ChangeQuantity(quantity);
    }

    public Guid CartId { get; set; }

    public int ProductId { get; set; }

    public Product Product { get; set; } = null!;

    public int Quantity { get; set; }

    public decimal LineTotal => Product.Price * Quantity;

    internal void ChangeQuantity(int quantity) =>
        Quantity = quantity > 0 ? quantity : throw new CartItemQuantityInvalidException();
}
