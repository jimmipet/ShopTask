import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module.js';
import { ApiExceptionFilter } from './common/api-exception.filter.js';
import { ValidationFailedException } from './common/validation-failed.exception.js';
import { type Env, validateEnv } from './config.js';
import { POSTGRES_OPTIONS } from './database/postgres.options.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        ...POSTGRES_OPTIONS,
        url: config.get('DATABASE_URL', { infer: true }),
        autoLoadEntities: true,
      }),
    }),
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
