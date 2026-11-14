using ShopTask.Api.Modules.Products.Domain.Exceptions;

namespace ShopTask.Api.Modules.Products.Domain.Entities;

public sealed class Product
{
    public const int TitleMaxLength = 120;
    public const int CategoryMaxLength = 60;
    public const int DescriptionMaxLength = 1000;
    public const int ImageMaxLength = 2048;
    public const int PricePrecision = 12;
    public const int PriceScale = 2;
    public const decimal MaxPrice = 9_999_999_999.99m;

    private Product()
    {
    }

    public int Id { get; private set; }

    public string Title { get; private set; } = string.Empty;

    public decimal Price { get; private set; }

    public string Category { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public string? Image { get; private set; }

    public static Product Create(string? title, decimal price, string? category, string? description, string? image)
    {
        var product = new Product();
        product.Update(title, price, category, description, image);
        return product;
    }

    public void Update(string? title, decimal price, string? category, string? description, string? image)
    {
        Title = Normalize(title) is { Length: > 0 and <= TitleMaxLength } validTitle
            ? validTitle
            : throw new ProductTitleInvalidException(TitleMaxLength);

        Category = Normalize(category) is { Length: > 0 and <= CategoryMaxLength } validCategory
            ? validCategory
            : throw new ProductCategoryInvalidException(CategoryMaxLength);

        Description = Normalize(description) is { Length: <= DescriptionMaxLength } validDescription
            ? validDescription
            : throw new ProductDescriptionTooLongException(DescriptionMaxLength);

        Image = Normalize(image) switch
        {
            "" => null,
            { Length: <= ImageMaxLength } url
                when Uri.TryCreate(url, UriKind.Absolute, out var uri) && uri.Scheme is "http" or "https" => url,
            _ => throw new ProductImageInvalidException(),
        };

        Price = price is >= 0 and <= MaxPrice && decimal.Round(price, PriceScale) == price
            ? price
            : throw new ProductPriceInvalidException(MaxPrice, PriceScale);
    }

    private static string Normalize(string? value) => value?.Trim() ?? string.Empty;

}
