namespace ShopTask.Api.Common.Domain.Exceptions;

public abstract class NotFoundException(string message) : BusinessLogicException(message);
