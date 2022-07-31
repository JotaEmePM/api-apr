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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { ViewUsuarioDto } from './dto/view-usuario.dto'
import { EmailService } from 'src/email/email.services'
import { EnviarCorreoConfirmacionDto } from 'src/email/dto/enviarCorreoConfirmacion.dto'

@ApiBearerAuth()
@Controller('usuario')
@ApiTags('Usuario')
export class UsuariosController {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly emailService: EmailService
  ) {}

  @Post()
  @ApiBody({ type: CreateUsuariosDto })
  // @ApiResponse({ status: 201, description: 'Usuario conectado correctamente' })
  // @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'Metadata usuario',
    type: ResponseValueDto,
  })
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

        const { user, userId } = await this.usuarioService.create(createUserDto)
        const usuarioData = new ViewUsuarioDto()
        console.log(userId)

        usuarioData.UserId = userId

        usuarioData.Username = user.Username
        usuarioData.Nombre = user.Nombre
        usuarioData.Rut = user.Rut
        usuarioData.Email = user.Email
        usuarioData.Telefono = user.Telefono
        usuarioData.EsParticular = user.EsParticular
        usuarioData.EmailVerificado = user.EmailVerificado

        // TODO: Implementar envío de email.
        const emailConfirmation = new EnviarCorreoConfirmacionDto()
        emailConfirmation.email = user.Email
        emailConfirmation.token = user.EmailToken
        emailConfirmation.nombre = user.Nombre
        emailConfirmation.userId = userId
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
  @ApiCreatedResponse({
    description: 'Listado de usuarios',
    type: ResponseValueDto,
  })
  async findAll(@Res() response): Promise<Usuarios[]> {
    return response
      .status(HttpStatus.OK)
      .json(
        new ResponseValueDto(
          false,
          'Listado de usuarios',
          this.usuarioService.findAll()
        )
      )
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
