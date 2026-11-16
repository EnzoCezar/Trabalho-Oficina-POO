import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './veiculo.entity';
import { Cliente } from '../clientes/cliente.entity';
import { VeiculosController } from './veiculos.controller';
import { VeiculosService } from './veiculos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo, Cliente])],
  controllers: [VeiculosController],
  providers: [VeiculosService],
})

export class VeiculosModule {}