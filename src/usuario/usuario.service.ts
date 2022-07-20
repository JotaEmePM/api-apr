import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { Usuario, UsuarioDocument } from "./schemas/usuario.schema";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<UsuarioDocument>
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const createdUsuario = await this.usuarioModel.create(createUsuarioDto);
    return createdUsuario;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findOne(id: string): Promise<Usuario> {
    return this.usuarioModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedUsuario = await this.usuarioModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUsuario;
  }
}
