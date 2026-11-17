import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdemServico } from './ordem-servico.entity';
import { Veiculo } from '../veiculos/veiculo.entity';
import { OrdensServicoController } from './ordens-servico.controller';
import { OrdensServicoService } from './ordens-servico.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdemServico, Veiculo])],
  controllers: [OrdensServicoController],
  providers: [OrdensServicoService],
})

export class OrdensServicoModule {}