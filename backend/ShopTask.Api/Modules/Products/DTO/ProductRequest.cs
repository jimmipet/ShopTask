namespace ShopTask.Api.Modules.Products.DTO;

public sealed record ProductRequest
{
    public string? Title { get; init; }

    public decimal Price { get; init; }

    public string? Category { get; init; }

    public string? Description { get; init; }

    public string? Image { get; init; }
}
