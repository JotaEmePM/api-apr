import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUsuariosDto } from './dto/create-usuarios.dto'
import { SecurityService } from 'src/services/security.services'
import {
  Usuarios,
  UsuariosDocument,
  PasswordHistory,
} from './schemas/usuarios.schema'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuarios.name)
    private readonly usuariosModel: Model<UsuariosDocument>,
    private readonly securityService: SecurityService,
    private httpService: HttpService
  ) {}

  async create(createUsuarioDto: CreateUsuariosDto): Promise<any> {
    const password = new PasswordHistory()
    password.Id = 1
    password.FechaCreacion = new Date()
    password.FechaExpiracion = null
    const sec = await this.securityService.generateSaltHash(
      createUsuarioDto.Password
    )
    password.Hash = sec.password
    password.Salt = sec.salt

    const user = new Usuarios()
    user.Username = createUsuarioDto.Username
    user.Email = createUsuarioDto.Email
    user.Rut = createUsuarioDto.Rut
    user.Nombre = createUsuarioDto.Nombre
    user.Telefono = createUsuarioDto.Telefono
    user.Password = 1
    user.EsParticular = createUsuarioDto.EsParticular
    user.EmailVerificado = false
    user.EmailToken = await this.securityService.generateGUID()
    user.Habilitado = true

    user.UserType = [createUsuarioDto.UserType]
    user.CreatedAt = new Date()
    user.PasswordHistory = [password]

    const createdUsuario = await this.usuariosModel.create(user)
    return {
      user: createdUsuario,
      userId: createdUsuario._id,
    }
  }

  async findAll(): Promise<Usuarios[]> {
    return this.usuariosModel.find().exec()
  }

  async findOne(id: string): Promise<Usuarios> {
    return this.usuariosModel.findOne({ _id: id }).exec()
  }

  async findBy(key: string, value: string): Promise<Usuarios[]> {
    return this.usuariosModel.where(key).equals(value).exec()
  }

  async findOneBy(key: string, value: string): Promise<Usuarios> {
    return this.usuariosModel.where(key).equals(value).findOne()
  }

  async delete(id: string) {
    const deletedUsuario = await this.usuariosModel
      .findByIdAndRemove({ _id: id })
      .exec()
    return deletedUsuario
  }
}
