import { HttpException, Injectable, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Usuarios } from 'src/components/usuarios/schemas/usuarios.schema'
import { LoginAuthDto } from './dto/login-auth.dto'
import { UsuariosDocument } from '../components/usuarios/schemas/usuarios.schema'
import { Model } from 'mongoose'
import { SecurityService } from '../services/security.services'
import { JwtService } from '@nestjs/jwt'
import { ResponseValueDto } from '../dto/response.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuarios.name)
    private readonly userModel: Model<UsuariosDocument>,
    private readonly securityService: SecurityService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto
    const findUser = await this.userModel.findOne({ email })

    console.log(findUser)
    if (!findUser)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)

    const passwordIndex = findUser.PasswordHistory.findIndex(
      u => u.Id == findUser.Password
    )
    const { Hash, Salt } = findUser.PasswordHistory[passwordIndex]

    if (!(await this.securityService.checkPassword(Salt, Hash, password)))
      throw new HttpException('Contraseña invalida', HttpStatus.FORBIDDEN)

    const payload = {
      id: findUser._id,
      username: findUser.Username,
      email: findUser.Email,
      nombre: findUser.Nombre,
      IsVerified: findUser.EmailVerificado,
    }
    const token = await this.jwtService.signAsync(payload)
    return new ResponseValueDto(false, 'Usuario verificado', { token, payload })
  }
}
