using ShopTask.Api.Modules.Carts.Domain.Exceptions;
using ShopTask.Api.Modules.Products.Domain.Entities;

namespace ShopTask.Api.Modules.Carts.Domain.Entities;

public sealed class CartItem
{
    public const int MinQuantity = 1;
    public const int MaxQuantity = 99;

    private CartItem()
    {
    }

    internal CartItem(Product product, int quantity)
    {
        Product = product;
        ProductId = product.Id;
        ChangeQuantity(quantity);
    }

    public Guid CartId { get; private set; }

    public int ProductId { get; private set; }

    public Product Product { get; private set; } = null!;

    public int Quantity { get; private set; }

    public decimal LineTotal => Product.Price * Quantity;

    internal void ChangeQuantity(int quantity) =>
        Quantity = quantity is >= MinQuantity and <= MaxQuantity
            ? quantity
            : throw new CartItemQuantityOutOfRangeException(MinQuantity, MaxQuantity);
}
