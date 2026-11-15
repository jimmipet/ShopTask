import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';
import type { Env } from './config.js';

const app = await NestFactory.create(AppModule);
const config = app.get<ConfigService<Env, true>>(ConfigService);

app.setGlobalPrefix('api');
app.use(cookieParser());
app.enableCors({
  origin: config.get('CORS_ORIGIN', { infer: true }),
  credentials: true,
});
app.enableShutdownHooks();

await app.listen(config.get('PORT', { infer: true }));
