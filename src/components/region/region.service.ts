import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateRegionDto } from './dto/create-region.dto'
import { Region } from './schemas/region.schema'

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name)
    private readonly regionModel: Model<Region>
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    return await this.regionModel.create(createRegionDto)
  }

  async findAll() {
    return this.regionModel.find().exec()
  }

  findOne(code: string) {
    return this.regionModel.find({ 'provincias.comunas.code': code }).exec()
  }

  // update(id: number, updateRegionDto: UpdateRegionDto) {
  //   return `This action updates a #${id} region`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} region`
  // }
}
