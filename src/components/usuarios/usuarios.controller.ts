import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { UsuariosService } from './Usuarios.services'
import { CreateUsuariosDto } from './dto/create-usuarios.dto'
import { Usuarios } from './schemas/usuarios.schema'
import { validateOrReject } from 'class-validator'
import { ResponseDto, ResponseValueDto } from 'src/dto/response.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

@ApiBearerAuth()
@Controller('usuario')
@ApiTags('Usuario')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @Post()
  async create(@Body() createUserDto: CreateUsuariosDto, @Res() response) {
    try {
      // Validar datos de entrada
      await validateOrReject(createUserDto)

      // Validar existencia de usuario
      //  ValidarEmail
      const existeEmail = await this.usuarioService.findBy(
        'Email',
        createUserDto.Email
      )
      const existeUserName = await this.usuarioService.findBy(
        'Username',
        createUserDto.Username
      )
      const existeRut = await this.usuarioService.findBy(
        'Rut',
        createUserDto.Rut
      )

      if (existeEmail.length > 0) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(new ResponseDto(true, 'Email ya se encuentra registrado '))
      } else if (existeUserName.length > 0) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(new ResponseDto(true, 'UserName ya se encuentra registrado '))
      } else if (existeRut.length > 0) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(new ResponseDto(false, 'Rut ya se encuentra registrado'))
      } else {
        // TODO: Validar UserType
        // TODO: Validar password

        // TODO: Validar permisos usuario creador

        const newUser = await this.usuarioService.create(createUserDto)

        return response
          .status(HttpStatus.OK)
          .json(
            new ResponseValueDto(
              false,
              'Usuario registrado correctamente',
              newUser
            )
          )
      }
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(true, 'Problema con datos: ' + error)
    }
    // TODO: Implementar validaciones de datos y existencia de usuarios
    // TODO: Implementar envío de email.
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Usuarios[]> {
    return this.usuarioService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Usuarios> {
    return this.usuarioService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usuarioService.delete(id)
  }
}
