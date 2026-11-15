namespace ShopTask.Api.Common.Domain.Exceptions;

public abstract class BusinessLogicException(string message) : Exception(message)
{
    public string Code => GetType().Name;
}
