using ShopTask.Api.Common.Domain.Exceptions;

namespace ShopTask.Api.Modules.Carts.Domain.Exceptions;

public class CartItemNotFoundException(int productId)
    : NotFoundException($"Product '{productId}' is not in the cart.");

public class CartItemQuantityInvalidException()
    : BusinessLogicException("Quantity of a product in the cart must be greater than zero.");
