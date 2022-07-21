import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRolDto } from "./dto/create-rol.dto";
import { Rol, RolDocument } from "./schemas/rol.schema";

@Injectable()
export class RolService {
  constructor(
    @InjectModel(Rol.name)
      private readonly rolModel: Model<RolDocument>
  ) {}

  async create(createRolDto: CreateRolDto): Promise<Rol> {
    const createdRol = await this.rolModel.create(createRolDto);
    return createdRol;
  }

  async findAll(): Promise<Rol[]> {
    return this.rolModel.find().exec();
  }

  async findOne(id: string): Promise<Rol> {
    return this.rolModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedRol = await this.rolModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedRol;
  }
}
