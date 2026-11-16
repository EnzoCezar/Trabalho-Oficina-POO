import { IsNumber, IsPositive } from 'class-validator';

export class UpdateValorDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  valor: number;
}