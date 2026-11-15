import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';

const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('api');
app.use(cookieParser());
app.enableCors({ origin: process.env.CORS_ORIGIN, credentials: true });
await app.listen(process.env.PORT ?? 5240);
