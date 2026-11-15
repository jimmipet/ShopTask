import { BadRequestException } from '@nestjs/common';
import type { ValidationError } from 'class-validator';

export class ValidationFailedException extends BadRequestException {
  public readonly errors: { path: string; message: string }[];

  constructor(errors: ValidationError[]) {
    super('One or more validation errors occurred.');
    this.errors = errors.map(({ property, constraints }) => ({
      path: property,
      message: Object.values(constraints ?? {}).join('; '),
    }));
  }
}
