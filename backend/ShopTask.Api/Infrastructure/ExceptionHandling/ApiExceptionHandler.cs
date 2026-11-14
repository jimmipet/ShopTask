using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using ShopTask.Api.Common.Domain.Exceptions;

namespace ShopTask.Api.Infrastructure.ExceptionHandling;

internal sealed class ApiExceptionHandler(IProblemDetailsService problemDetailsService) : IExceptionHandler
{
    public ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        int? status = exception switch
        {
            NotFoundException => StatusCodes.Status404NotFound,
            BusinessLogicException => StatusCodes.Status422UnprocessableEntity,
            DbUpdateConcurrencyException => StatusCodes.Status409Conflict,
            BadHttpRequestException badRequest => badRequest.StatusCode,
            _ => null,
        };

        if (status is null)
        {
            return ValueTask.FromResult(false);
        }

        httpContext.Response.StatusCode = status.Value;
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
            if (exception.Parameters is not null)
            {
                problem.Extensions["params"] = exception.Parameters;
            }

            return;
        }

        problem.Extensions["code"] = problem switch
        {
            HttpValidationProblemDetails => "ValidationFailed",
            { Status: StatusCodes.Status400BadRequest } => "BadRequest",
            { Status: StatusCodes.Status404NotFound } => "NotFound",
            { Status: StatusCodes.Status405MethodNotAllowed } => "MethodNotAllowed",
            { Status: StatusCodes.Status409Conflict } => "Conflict",
            _ => "InternalServerError",
        };
    }
}
