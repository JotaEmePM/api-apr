import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { APR } from './schema/apr.schema'
// import { CreateRegionDto } from './dto/create-region.dto'
import { CreateAPRDto } from './dto/createAPR.dto'

@Injectable()
export class APRService {
  constructor(
    @InjectModel(APR.name)
    private readonly aprModel: Model<APR>
  ) {}

  async create(createAPRDto: CreateAPRDto) {
    return await this.aprModel.create(createAPRDto)
  }

  async findAll() {
    return this.aprModel.find().exec()
  }

  findOne(id: string) {
    return this.aprModel.find({ _id: id }).exec()
  }

  // update(id: string, updateRegionDto: UpdateRegionDto) {
  //   return `This action updates a #${id} region`
  // }
}
