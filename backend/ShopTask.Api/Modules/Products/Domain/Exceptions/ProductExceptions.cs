using ShopTask.Api.Common.Domain.Exceptions;

namespace ShopTask.Api.Modules.Products.Domain.Exceptions;

public sealed class ProductNotFoundException(int productId)
    : NotFoundException($"Product '{productId}' was not found.");

public sealed class ProductTitleInvalidException(int maxLength)
    : BusinessLogicException(
        $"Product title is required and must be at most {maxLength} characters long.",
        new { maxLength });

public sealed class ProductCategoryInvalidException(int maxLength)
    : BusinessLogicException(
        $"Product category is required and must be at most {maxLength} characters long.",
        new { maxLength });

public sealed class ProductDescriptionTooLongException(int maxLength)
    : BusinessLogicException(
        $"Product description must be at most {maxLength} characters long.",
        new { maxLength });

public sealed class ProductImageInvalidException()
    : BusinessLogicException("Product image must be an absolute http(s) URL.");

public sealed class ProductPriceInvalidException(decimal maxPrice, int scale)
    : BusinessLogicException(
        $"Product price must be between 0 and {maxPrice} with at most {scale} decimal places.",
        new { maxPrice, scale });
