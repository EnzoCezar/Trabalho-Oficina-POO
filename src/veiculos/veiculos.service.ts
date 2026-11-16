import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from './veiculo.entity';
import { Cliente } from '../clientes/cliente.entity';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(Veiculo) private readonly repo: Repository<Veiculo>,
    @InjectRepository(Cliente) private readonly clienteRepo: Repository<Cliente>,
  ) {}
  
  findAll() {
    return this.repo.find();
  }
  
  async findOne(id: number) {
    const veiculo = await this.repo.findOneBy({ id });
    if (!veiculo) {
      throw new NotFoundException(`Veículo ${id} não encontrado`);
    }
    return veiculo;
  }
  
  private async garantirCliente(clienteId: number) {
    const cliente = await this.clienteRepo.findOneBy({ id: clienteId });
    if (!cliente) {
      throw new NotFoundException(`Cliente ${clienteId} não encontrado`);
    }
  }
  
  private async garantirPlacaLivre(placa: string, idIgnorado?: number) {
    const existente = await this.repo.findOneBy({ placa });
    if (existente && existente.id !== idIgnorado) {
      throw new ConflictException(`A placa ${placa} já está cadastrada`);
    }
  }
  
  async create(dto: CreateVeiculoDto) {
    await this.garantirCliente(dto.clienteId);
    await this.garantirPlacaLivre(dto.placa);
    const veiculo = await this.repo.save(this.repo.create(dto));
    return this.findOne(veiculo.id);
  }
  
  async update(id: number, dto: UpdateVeiculoDto) {
    await this.findOne(id);
    if (dto.clienteId) await this.garantirCliente(dto.clienteId);
    if (dto.placa) await this.garantirPlacaLivre(dto.placa, id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }
  
  async remove(id: number) {
    const veiculo = await this.findOne(id);
    await this.repo.remove(veiculo);
  }
}