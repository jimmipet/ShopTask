import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  BusinessLogicException,
  NotFoundException,
} from './business-logic.exception.js';
import { ValidationFailedException } from './validation-failed.exception.js';

const CODES_BY_STATUS: Partial<Record<number, string>> = {
  [HttpStatus.BAD_REQUEST]: 'BadRequest',
  [HttpStatus.NOT_FOUND]: 'NotFound',
  [HttpStatus.METHOD_NOT_ALLOWED]: 'MethodNotAllowed',
};

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  public catch(exception: unknown, host: ArgumentsHost): void {
    const response = host
      .switchToHttp()
      .getResponse<Response>()
      .type('application/problem+json');

    if (exception instanceof BusinessLogicException) {
      const status =
        exception instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.UNPROCESSABLE_ENTITY;
      response
        .status(status)
        .json({ status, code: exception.code, detail: exception.message });
      return;
    }

    if (exception instanceof ValidationFailedException) {
      const status = exception.getStatus();
      response
        .status(status)
        .json({ status, code: 'ValidationFailed', errors: exception.errors });
      return;
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    if (status >= 500) {
      this.logger.error(exception);
    }
    response
      .status(status)
      .json({ status, code: CODES_BY_STATUS[status] ?? 'InternalServerError' });
  }
}
