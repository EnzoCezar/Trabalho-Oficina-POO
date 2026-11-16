import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdensServicoService } from './ordens-servico.service';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateValorDto } from './dto/update-valor.dto';

@Controller('ordens-servico')
export class OrdensServicoController {
  constructor(private readonly service: OrdensServicoService) {}
  
  @Get()
  findAll() {
    return this.service.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
  
  @Post()
  create(@Body() dto: CreateOrdemServicoDto) {
    return this.service.create(dto);
  }
  
  @Patch(':id/valor')
  atualizarValor(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateValorDto,
  ) {
    return this.service.atualizarValor(id, dto);
  }
  
  @Patch(':id/status')
  atualizarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.service.atualizarStatus(id, dto);
  }
  
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}