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
import { ViewUsuarioDto } from './dto/view-usuario.dto'
import { EmailService } from 'src/email/email.services'
import { EnviarCorreoConfirmacionDto } from 'src/email/dto/enviarCorreoConfirmacion.dto'

@ApiBearerAuth()
@Controller('usuario')
@ApiTags('Usuario')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService,
    private readonly emailService: EmailService) {}

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
        var usuarioData = new ViewUsuarioDto()
        usuarioData.UserId = newUser.UserId
        usuarioData.Username = newUser.Username
        usuarioData.Nombre = newUser.Nombre
        usuarioData.Rut = newUser.Rut
        usuarioData.Email = newUser.Email
        usuarioData.Telefono = newUser.Telefono
        usuarioData.EsParticular = newUser.EsParticular
        usuarioData.EmailVerificado = newUser.EmailVerificado

        // TODO: Implementar envío de email.
        const emailConfirmation = new EnviarCorreoConfirmacionDto()
        emailConfirmation.email = newUser.Email
        emailConfirmation.token = newUser.EmailToken
        emailConfirmation.nombre = newUser.Nombre
        emailConfirmation.userId = newUser.UserId
        this.emailService.EnviarEmailConfirmacion(emailConfirmation)

        return response
          .status(HttpStatus.OK)
          .json(
            new ResponseValueDto(
              false,
              'Usuario registrado correctamente',
              usuarioData
            )
          )
      }
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(true, 'Problema con datos: ' + error)
    }
    
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
