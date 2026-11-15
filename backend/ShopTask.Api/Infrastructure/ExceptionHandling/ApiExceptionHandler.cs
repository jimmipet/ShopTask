using Microsoft.AspNetCore.Diagnostics;
using ShopTask.Api.Common.Domain.Exceptions;

namespace ShopTask.Api.Infrastructure.ExceptionHandling;

public class ApiExceptionHandler(IProblemDetailsService problemDetailsService) : IExceptionHandler
{
    public ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is not BusinessLogicException)
        {
            return ValueTask.FromResult(false);
        }

        var status = exception is NotFoundException
            ? StatusCodes.Status404NotFound
            : StatusCodes.Status422UnprocessableEntity;

        httpContext.Response.StatusCode = status;
        return problemDetailsService.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = httpContext,
            Exception = exception,
            ProblemDetails = { Status = status },
        });
    }

    public static void AddErrorCode(ProblemDetailsContext context)
    {
        var problem = context.ProblemDetails;

        if (context.Exception is BusinessLogicException exception)
        {
            problem.Detail = exception.Message;
            problem.Extensions["code"] = exception.Code;
            return;
        }

        problem.Extensions["code"] = problem switch
        {
            HttpValidationProblemDetails => "ValidationFailed",
            { Status: StatusCodes.Status400BadRequest } => "BadRequest",
            { Status: StatusCodes.Status404NotFound } => "NotFound",
            { Status: StatusCodes.Status405MethodNotAllowed } => "MethodNotAllowed",
            _ => "InternalServerError",
        };
    }
}
