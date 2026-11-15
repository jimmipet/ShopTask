import { IsInt } from 'class-validator';

export class SetQuantityDto {
  @IsInt()
  quantity: number;
}
