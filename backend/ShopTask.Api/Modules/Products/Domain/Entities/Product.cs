using System.ComponentModel.DataAnnotations.Schema;
using ShopTask.Api.Common.Domain.Entities;

namespace ShopTask.Api.Modules.Products.Domain.Entities;

[Table("products")]
public class Product : Entity<int>
{
    private Product()
    {
    }

    public string Title { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string Category { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string? Image { get; set; }

    public static Product Create(string title, decimal price, string category, string description, string? image)
    {
        var product = new Product();
        product.Update(title, price, category, description, image);
        return product;
    }

    public void Update(string title, decimal price, string category, string description, string? image)
    {
        Title = title;
        Price = price;
        Category = category;
        Description = description;
        Image = image;
        ModificationDate = DateTimeOffset.UtcNow;
    }
}
