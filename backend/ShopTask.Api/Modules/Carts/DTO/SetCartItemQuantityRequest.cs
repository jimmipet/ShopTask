namespace ShopTask.Api.Modules.Carts.DTO;

public record SetCartItemQuantityRequest
{
    public int Quantity { get; init; }
}
