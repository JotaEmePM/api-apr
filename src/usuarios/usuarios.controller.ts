import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common'
import { UsuariosService } from './Usuarios.services'
import { CreateUsuariosDto } from './dto/create-usuarios.dto'
import { Usuarios } from './schemas/usuarios.schema'
import { validateOrReject } from 'class-validator'
import { ResponseDto } from 'src/dto/response.dto'

@Controller('usuario')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @Post()
  async create(@Body() createUserDto: CreateUsuariosDto, @Res() response) {
    try {
      // Validar datos de entrada
      await validateOrReject(createUserDto)

      // Validar existencia de usuario
      //  ValidarEmail
      var existeEmail = await this.usuarioService.findBy(
        'Email',
        createUserDto.Email
      )
      console.log('email', "-", existeEmail.Email,"-" , "-",createUserDto.Email, "-", (existeEmail.Email == createUserDto.Email))

      var existeUserName = await this.usuarioService.findBy(
        'Username',
        createUserDto.Username
      )
      console.log('Username', "-", existeEmail.Username,"-" , "-",createUserDto.Username, "-", (existeEmail.Username == createUserDto.Username))

      var existeRut = await this.usuarioService.findBy(
        'Rut',
        createUserDto.Rut
      )
      console.log('Rut', "-", existeEmail.Rut,"-" , "-",createUserDto.Rut, "-", (existeEmail.Rut == createUserDto.Rut))


      if(existeEmail) {
        const resDto = new ResponseDto()
        resDto.IsError = true
        ;(resDto.Message = 'Email ya se encuentra registrado ')
        return response.status(HttpStatus.BAD_REQUEST).json(resDto)
      }

      //  ValidarNombreUsuario

      if(existeUserName) {
        const resDto = new ResponseDto()
        resDto.IsError = true
        ;(resDto.Message = 'UserName ya se encuentra registrado ')
        return response.status(HttpStatus.BAD_REQUEST).json(resDto)
      }

      //  ValidarRut

      if(existeRut) {
        const resDto = new ResponseDto()
        resDto.IsError = true
        ;(resDto.Message = 'Rut ya se encuentra registrado ')
        return response.status(HttpStatus.BAD_REQUEST).json(resDto)
      }

      // TODO: Validar UserType
      // TODO: Validar password




      // TODO: Validar permisos usuario creador

      const newUser = await this.usuarioService.create(createUserDto)
      const resDto = new ResponseDto()
      resDto.IsError = false
      ;(resDto.Message = 'Usuario registrado correctamente-'), existeEmail
      return response.status(HttpStatus.OK).json(resDto)
    } catch (error) {
      const resDto = new ResponseDto()
      resDto.IsError = true
      ;(resDto.Message = 'Problema con datos: '), error
      return response.status(HttpStatus.BAD_REQUEST).json(resDto)
    }
    // TODO: Implementar validaciones de datos y existencia de usuarios
    // TODO: Implementar envío de email.
  }

  @Get()
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
