using System.ComponentModel.DataAnnotations.Schema;
using ShopTask.Api.Common.Domain.Entities;
using ShopTask.Api.Modules.Carts.Domain.Exceptions;
using ShopTask.Api.Modules.Products.Domain.Entities;

namespace ShopTask.Api.Modules.Carts.Domain.Entities;

[Table("carts")]
public class Cart : Entity<Guid>
{
    private readonly List<CartItem> items = [];

    private Cart()
    {
    }

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

        ModificationDate = DateTimeOffset.UtcNow;
    }

    public void RemoveProduct(int productId)
    {
        items.Remove(FindItem(productId) ?? throw new CartItemNotFoundException(productId));
        ModificationDate = DateTimeOffset.UtcNow;
    }

    private CartItem? FindItem(int productId) => items.Find(item => item.ProductId == productId);
}
