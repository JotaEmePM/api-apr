import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './schemas/Usuario.schema';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createCatDto: CreateUsuarioDto) {
    await this.usuarioService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usuarioService.delete(id);
  }
}
