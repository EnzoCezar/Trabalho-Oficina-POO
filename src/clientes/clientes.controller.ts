import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly service: ClientesService) { }
    
    @Get()
    findAll() {
        return this.service.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }
    
    @Post()
    create(@Body() dto: CreateClienteDto) {
        return this.service.create(dto);
    }
    
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClienteDto) {
        return this.service.update(id, dto);
    }
    
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}