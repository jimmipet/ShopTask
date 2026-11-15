import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductRequestDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string | null = null;
}
