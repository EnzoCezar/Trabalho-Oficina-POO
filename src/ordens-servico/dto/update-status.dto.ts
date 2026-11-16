import { IsEnum } from 'class-validator';
import { StatusOrdem } from '../status-ordem.enum';

export class UpdateStatusDto {
  @IsEnum(StatusOrdem)
  status: StatusOrdem;
}