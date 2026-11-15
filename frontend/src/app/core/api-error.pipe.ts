import { HttpErrorResponse } from '@angular/common/http';
import { Pipe, type PipeTransform } from '@angular/core';

const API_ERROR_MESSAGES = {
  NetworkError: 'Сервер недоступен. Проверьте подключение.',
  InternalServerError: 'Ошибка на сервере. Попробуйте позже.',
  ProductNotFoundException: 'Товар не найден.',
  UnknownError: 'Что-то пошло не так. Попробуйте ещё раз.',
} as const;

@Pipe({ name: 'apiError' })
export class ApiErrorPipe implements PipeTransform {
  public transform(error: unknown): string {
    const response = error instanceof HttpErrorResponse ? error : undefined;
    const { code = response?.status === 0 ? 'NetworkError' : '' } = (response?.error ?? {}) as {
      code?: string;
    };
    return Object.hasOwn(API_ERROR_MESSAGES, code)
      ? API_ERROR_MESSAGES[code as keyof typeof API_ERROR_MESSAGES]
      : API_ERROR_MESSAGES.UnknownError;
  }
}
