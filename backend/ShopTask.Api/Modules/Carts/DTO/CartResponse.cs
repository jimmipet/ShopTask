namespace ShopTask.Api.Modules.Carts.DTO;

public record CartResponse
{
    public IReadOnlyList<CartItemResponse> Items { get; init; } = [];

    public int TotalQuantity { get; init; }

    public decimal TotalPrice { get; init; }
}
