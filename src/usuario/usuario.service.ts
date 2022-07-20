import { Inject, Injectable } from "@nestjs/common";
import { Model } from 'mongoose'
import { CreateUserDto } from "./dto/create-cat.dto";
import { Usuario } from "./interfaces/usuario.interface";

@Injectable()
export class UsuarioService {
  constructor(@Inject('USUARIO_MODEL') private readonly usuarioModel: Model<Usuario>) {}

  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    const createdUser = this.usuarioModel.create(createUserDto)
    return createdUser
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }
}
