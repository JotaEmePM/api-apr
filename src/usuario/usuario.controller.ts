import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-cat.dto";
import { Usuario } from "./interfaces/usuario.interface";
import { UsuarioService } from "./usuario.service";

@Controller('Usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createCatDto: CreateUserDto) {
    return this.usuarioService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll()
  }
}
