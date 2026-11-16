import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrdemServicoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;
  
  @IsInt()
  veiculoId: number;
  
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  valor?: number;
}