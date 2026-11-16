import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdemServico } from './ordem-servico.entity';
import { Veiculo } from '../veiculos/veiculo.entity';
import { StatusOrdem } from './status-ordem.enum';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateValorDto } from './dto/update-valor.dto';

@Injectable()
export class OrdensServicoService {
  constructor(
    @InjectRepository(OrdemServico) private readonly repo: Repository<OrdemServico>,
    @InjectRepository(Veiculo) private readonly veiculoRepo: Repository<Veiculo>,
  ) {}
  
  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }
  
  async findOne(id: number) {
    const ordem = await this.repo.findOneBy({ id });
    if (!ordem) {
      throw new NotFoundException(`Ordem de serviço ${id} não encontrada`);
    }
    return ordem;
  }
  
  async create(dto: CreateOrdemServicoDto) {
    const veiculo = await this.veiculoRepo.findOneBy({ id: dto.veiculoId });
    if (!veiculo) {
      throw new NotFoundException(`Veículo ${dto.veiculoId} não encontrado`);
    }
    const ordem = await this.repo.save(this.repo.create(dto));
    return this.findOne(ordem.id);
  }
  
  async atualizarValor(id: number, dto: UpdateValorDto) {
    const ordem = await this.findOne(id);
    if (ordem.status === StatusOrdem.CONCLUIDA) {
      throw new BadRequestException('Ordem já concluída não pode ser alterada');
    }
    await this.repo.update(id, { valor: dto.valor });
    return this.findOne(id);
  }

  async atualizarStatus(id: number, dto: UpdateStatusDto) {
    const ordem = await this.findOne(id);
    if (ordem.status === StatusOrdem.CONCLUIDA) {
      throw new BadRequestException('Ordem já concluída não pode ser alterada');
    }
    if (dto.status === StatusOrdem.CONCLUIDA) {
      if (ordem.valor === null || ordem.valor <= 0) {
        throw new BadRequestException(
          'Defina o valor da ordem antes de concluí-la',
        );
      }
      await this.repo.update(id, {
        status: StatusOrdem.CONCLUIDA,
        dataConclusao: new Date(),
      });
    } else {
      await this.repo.update(id, { status: dto.status });
    }
    return this.findOne(id);
  }
  
  async remove(id: number) {
    const ordem = await this.findOne(id);
    await this.repo.remove(ordem);
  }
}