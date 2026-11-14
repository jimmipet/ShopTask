namespace ShopTask.Api.Modules.Carts.DTO;

public sealed record SetCartItemQuantityRequest
{
    public int Quantity { get; init; }
}
