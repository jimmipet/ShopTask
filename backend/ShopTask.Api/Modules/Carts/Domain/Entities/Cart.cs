using ShopTask.Api.Modules.Carts.Domain.Exceptions;
using ShopTask.Api.Modules.Products.Domain.Entities;

namespace ShopTask.Api.Modules.Carts.Domain.Entities;

public sealed class Cart
{
    private readonly List<CartItem> items = [];

    private Cart()
    {
    }

    public Guid Id { get; private set; }

    public int Version { get; private set; }

    public IReadOnlyCollection<CartItem> Items => items.AsReadOnly();

    public int TotalQuantity => items.Sum(item => item.Quantity);

    public decimal TotalPrice => items.Sum(item => item.LineTotal);

    public static Cart Create() => new() { Id = Guid.CreateVersion7() };

    public void SetQuantity(Product product, int quantity)
    {
        if (FindItem(product.Id) is { } item)
        {
            item.ChangeQuantity(quantity);
        }
        else
        {
            items.Add(new CartItem(product, quantity));
        }

        Version++;
    }

    public void RemoveProduct(int productId)
    {
        items.Remove(FindItem(productId) ?? throw new CartItemNotFoundException(productId));
        Version++;
    }

    private CartItem? FindItem(int productId) => items.Find(item => item.ProductId == productId);
}
