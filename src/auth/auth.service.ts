import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Usuarios } from 'src/components/usuarios/schemas/usuarios.schema'
import { LoginUserAuthDto } from './dto/login-auth.dto'
import { UsuariosDocument } from '../components/usuarios/schemas/usuarios.schema'
import { Model } from 'mongoose'
import { SecurityService } from '../services/security.services'
import { JwtService } from '@nestjs/jwt'
import { ResponseValueDto } from '../dto/response.dto'
import {
  APRUser,
  APRUserDocument,
} from '../components/apr/schema/aprUser.schema'
import { APR, APRDocument } from '../components/apr/schema/apr.schema'
import { RolDocument } from 'src/components/roles/schemas/rol.schema'
import { Rol } from '../components/roles/schemas/rol.schema'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuarios.name)
    private readonly userModel: Model<UsuariosDocument>,
    @InjectModel(APR.name)
    private readonly aprModel: Model<APRDocument>,
    @InjectModel(APRUser.name)
    private readonly aprUserModel: Model<APRUserDocument>,
    @InjectModel(Rol.name)
    private readonly rolModel: Model<RolDocument>,
    private readonly securityService: SecurityService,
    private readonly jwtService: JwtService
  ) {}

  async loginUser(loginAuthDto: LoginUserAuthDto) {
    const { email, password, subdomain } = loginAuthDto
    const findUser = await this.userModel.findOne({ email })

    if (subdomain === 'admin') {
      if (!findUser.UserType.includes('62d9b6b719458b5009479d12'))
        return new ResponseValueDto(true, 'AUTH.USERNOADMIN', null)

      const passwordIndex = findUser.PasswordHistory.findIndex(
        u => u.Id == findUser.Password
      )
      const { Hash, Salt } = findUser.PasswordHistory[passwordIndex]

      if (!(await this.securityService.checkPassword(Salt, Hash, password)))
        return new ResponseValueDto(true, 'AUTH.PASSWORDINVALID', null)

      const payload = {
        id: findUser._id,
        username: findUser.Username,
        email: findUser.Email,
        nombre: findUser.Nombre,
        IsVerified: findUser.EmailVerificado,
        rolId: '62d9b6b719458b5009479d12',
        rolName: 'Admin',
      }
      const token = await this.jwtService.signAsync(payload)
      return new ResponseValueDto(false, 'AUTH.USERVALID', {
        token,
        payload,
      })
    } else {
      const findDomain = await this.aprModel.findOne({ subdomain })

      if (!findDomain)
        return new ResponseValueDto(true, 'AUTH.DOMAINNOTFOUND', null)

      if (!findUser)
        return new ResponseValueDto(true, 'AUTH.USERNOTFOUND', null)

      const findUserAPR = await this.aprUserModel.findOne({
        subdomainId: findDomain._id,
        userId: findUser._id,
      })

      if (findUserAPR)
        return new ResponseValueDto(true, 'AUTH.USERAPRNOTFOUND', null)

      if (!findUserAPR.enabled)
        return new ResponseValueDto(true, 'AUTH.USERDISABLED', null)

      const passwordIndex = findUser.PasswordHistory.findIndex(
        u => u.Id == findUser.Password
      )
      const { Hash, Salt } = findUser.PasswordHistory[passwordIndex]

      if (!(await this.securityService.checkPassword(Salt, Hash, password)))
        return new ResponseValueDto(true, 'AUTH.PASSWORDINVALID', null)

      const rol = await this.rolModel.findById(findUserAPR.rolId)
      if (!rol) return new ResponseValueDto(true, 'AUTH.USERROLINVALID', null)

      const payload = {
        id: findUser._id,
        username: findUser.Username,
        email: findUser.Email,
        nombre: findUser.Nombre,
        IsVerified: findUser.EmailVerificado,
        rolId: rol._id,
        rolName: rol.Nombre,
      }
      const token = await this.jwtService.signAsync(payload)
      return new ResponseValueDto(false, 'AUTH.USERVALID', {
        token,
        payload,
      })
    }
  }
}
