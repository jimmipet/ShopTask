using ShopTask.Api.Common.Domain.Exceptions;

namespace ShopTask.Api.Modules.Carts.Domain.Exceptions;

public class CartItemNotFoundException(int productId)
    : NotFoundException($"Product '{productId}' is not in the cart.");

public class CartItemQuantityOutOfRangeException(int min, int max)
    : BusinessLogicException($"Quantity of a product in the cart must be between {min} and {max}.");
