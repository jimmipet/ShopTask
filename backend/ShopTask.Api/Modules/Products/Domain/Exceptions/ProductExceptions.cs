using ShopTask.Api.Common.Domain.Exceptions;

namespace ShopTask.Api.Modules.Products.Domain.Exceptions;

public class ProductNotFoundException(int productId)
    : NotFoundException($"Product '{productId}' was not found.");
