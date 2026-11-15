import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CartModule } from './cart/cart.module.js';
import { ApiExceptionFilter } from './common/api-exception.filter.js';
import { ValidationFailedException } from './common/validation-failed.exception.js';
import { validateEnv } from './config.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    PrismaModule,
    ProductsModule,
    CartModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: ApiExceptionFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => new ValidationFailedException(errors),
      }),
    },
  ],
})
export class AppModule {}
