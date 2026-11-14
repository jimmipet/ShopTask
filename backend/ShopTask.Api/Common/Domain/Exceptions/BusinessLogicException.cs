namespace ShopTask.Api.Common.Domain.Exceptions;

public abstract class BusinessLogicException(string message, object? parameters = null) : Exception(message)
{
    public string Code => GetType().Name;

    public object? Parameters { get; } = parameters;
}
