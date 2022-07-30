import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { APR } from './schema/apr.schema'
// import { CreateRegionDto } from './dto/create-region.dto'
import { CreateAPRDto } from './dto/createAPR.dto'
import { APRUser } from './schema/aprUser.schema'
import { CreateAPRUserDto } from './dto/CreateAPRUser.dto'

@Injectable()
export class APRService {
  constructor(
    @InjectModel(APR.name)
    private readonly aprModel: Model<APR>,

    @InjectModel(APRUser.name)
    private readonly apruserModel: Model<APRUser>
  ) {}

  //#region APR
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

  //#endregion

  //#region  APRUser
  async createAPRUser(createAPRUserDto: CreateAPRUserDto) {
    return await this.apruserModel.create(createAPRUserDto)
  }

  async findAllUser(aprId: string) {
    return this.apruserModel.find({ subdomainId: aprId })
  }

  findOneAPRUser(id: string) {
    return this.apruserModel.find({ _id: id }).exec()
  }

  findOneAPRUserById(userId: string, aprId: string) {
    return this.apruserModel.find({ subdomainId: aprId, userId: userId })
  }
  //#endregion
}
