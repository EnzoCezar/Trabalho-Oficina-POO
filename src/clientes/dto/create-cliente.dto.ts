import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
  
  @IsString()
  @IsNotEmpty()
  telefone: string;
  
  @IsEmail()
  @IsOptional()
  email?: string;
}