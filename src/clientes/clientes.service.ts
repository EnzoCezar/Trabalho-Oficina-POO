import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(Cliente) private readonly repo: Repository<Cliente>,
    ) {}
    
    findAll() {
        return this.repo.find();
    }
    
    async findOne(id: number) {
        const cliente = await this.repo.findOneBy({ id });
        if (!cliente) {
            throw new NotFoundException(`Cliente ${id} não encontrado`);
        }
        return cliente;
    }
    
    create(dto: CreateClienteDto) {
        return this.repo.save(this.repo.create(dto));
    }
    
    async update(id: number, dto: UpdateClienteDto) {
        const cliente = await this.findOne(id);
        return this.repo.save({ ...cliente, ...dto });
    }
    
    async remove(id: number) {
        const cliente = await this.findOne(id);
        await this.repo.remove(cliente);
    }
}