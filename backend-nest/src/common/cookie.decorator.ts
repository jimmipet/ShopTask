import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const Cookie = createParamDecorator(
  (name: string, context: ExecutionContext): string | undefined =>
    (
      context.switchToHttp().getRequest<Request>().cookies as Record<
        string,
        string
      >
    )[name],
);
