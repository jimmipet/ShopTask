import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';

export class Env {
  @IsInt()
  @IsPositive()
  PORT: number = 5240;

  @IsUrl({ require_tld: false })
  CORS_ORIGIN: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;
}

export function validateEnv(config: Record<string, unknown>): Env {
  const env = plainToInstance(Env, config, { enableImplicitConversion: true });
  const errors = validateSync(env);
  if (errors.length) {
    throw new Error(`Invalid environment variables:\n${errors.toString()}`);
  }
  return env;
}
