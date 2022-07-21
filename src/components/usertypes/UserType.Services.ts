import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  UserType, UsertypeDocument, UserTypeSchema
} from './schemas/usertype.schema'

@Injectable()
export class UserTypeService {
  constructor(
    @InjectModel(UserType.name)
    private readonly usertypeModel: Model<UserType>,
  ) {}

  async findAll(): Promise<UserType[]> {
    return this.usertypeModel.find().exec()
  }

  async findOne(id: string): Promise<UserType> {
    return this.usertypeModel.findOne({ _id: id }).exec()
  }

  async findBy(key: string, value: string): Promise<UserType[]> {
    return this.usertypeModel.where(key).equals(value).exec()
  }
}
