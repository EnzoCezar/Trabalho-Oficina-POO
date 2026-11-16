import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Matches, Max, Min } from 'class-validator';

export class CreateVeiculoDto {
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim().toUpperCase() : value,
    )
    @IsString()
    @Matches(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, {
        message: 'Placa inválida. Use o formato ABC1234 ou ABC1D23',
    })
    placa: string;
    
    @IsString()
    @IsNotEmpty()
    modelo: string;
    
    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear() + 1)
    ano: number;
    
    @IsInt()
    clienteId: number;
}