import { Controller, Get } from "@nestjs/common";
import { Usuario } from "./interfaces/usuario.interface";
import { UsuarioService } from "./usuario.service";

@Controller('Usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll()
  }
}
