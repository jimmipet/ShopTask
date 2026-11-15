namespace ShopTask.Api.Modules.Carts.DTO;

public record CartItemResponse
{
    public int ProductId { get; init; }

    public string Title { get; init; } = string.Empty;

    public string Description { get; init; } = string.Empty;

    public string? Image { get; init; }

    public decimal UnitPrice { get; init; }

    public int Quantity { get; init; }

    public decimal LineTotal { get; init; }
}
