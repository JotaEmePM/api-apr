import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { APR, TipoCuenta } from './schema/apr.schema'
// import { CreateRegionDto } from './dto/create-region.dto'
import { CreateAPRDto } from './dto/createAPR.dto'
import { APRUser } from './schema/aprUser.schema'
import { CreateAPRUserDto } from './dto/CreateAPRUser.dto'
import { ResponseValueDto } from 'src/dto/response.dto'
import { validateRut, formatRut } from 'rutlib'

@Injectable()
export class APRService {
  constructor(
    @InjectModel(APR.name)
    private readonly aprModel: Model<APR>,

    @InjectModel(APRUser.name)
    private readonly apruserModel: Model<APRUser>
  ) {}

  //#region APR
  async create(createAPRDto: CreateAPRDto): Promise<ResponseValueDto> {
    try {
      const subdomainExist = await this.aprModel.findOne({
        subdomain: createAPRDto.subdomain,
      })
      if (subdomainExist)
        return new ResponseValueDto(true, 'APR_DOMAINEXIST', null)

      // Validar que APR no exista.
      if (!validateRut(createAPRDto.rut)) {
        return new ResponseValueDto(true, 'APR_RUTNOVALID', null)
      }
      createAPRDto.rut = formatRut(createAPRDto.rut, false)

      const rutExist = await this.aprModel.findOne({ rut: createAPRDto.rut })
      if (rutExist !== null)
        return new ResponseValueDto(false, 'APR_RUTEXIST', null)

      return new ResponseValueDto(false, 'APR_CREATED', {
        apr: await this.aprModel.create(createAPRDto),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'APR_ERRORCREATION', {
        error,
      })
    }
  }

  async findAll(): Promise<ResponseValueDto> {
    try {
      return new ResponseValueDto(false, 'APR_LISTOK', {
        aprs: await this.aprModel.find().exec(),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'APR_LISTERROR', {
        error,
      })
    }
  }

  async findOne(id: string): Promise<ResponseValueDto> {
    try {
      return new ResponseValueDto(false, 'APR_GETOK', {
        aprs: await this.aprModel.find({ _id: id }).exec(),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'APR_GETERROR', {
        error,
      })
    }
  }

  // update(id: string, updateRegionDto: UpdateRegionDto) {
  //   return `This action updates a #${id} region`
  // }

  //#endregion

  //#region  APRUser
  async createAPRUser(
    createAPRUserDto: CreateAPRUserDto
  ): Promise<ResponseValueDto> {
    try {
      return new ResponseValueDto(false, 'APRUSER_CREATED', {
        apr: await this.apruserModel.create(createAPRUserDto),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'APRUSER_ERRORCREATION', {
        error,
      })
    }
  }

  async findAllUser(aprId: string): Promise<ResponseValueDto> {
    try {
      return new ResponseValueDto(false, 'APRUSER_LISTOK', {
        aprs: await this.apruserModel.find({ subdomainId: aprId }),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'APRUSER_LISTERROR', {
        error,
      })
    }
  }

  async findOneAPRUser(id: string): Promise<ResponseValueDto> {
    try {
      return new ResponseValueDto(false, 'APRUSER_GETOK', {
        aprs: await this.apruserModel.find({ _id: id }).exec(),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'APRUSER_GETERROR', {
        error,
      })
    }
  }

  async findOneAPRUserById(
    userId: string,
    aprId: string
  ): Promise<ResponseValueDto> {
    try {
      return new ResponseValueDto(false, 'APRUSER_GETBYIDOK', {
        aprs: await this.apruserModel.find({
          subdomainId: aprId,
          userId: userId,
        }),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'APRUSER_GETBYIDERROR', {
        error,
      })
    }

    return
  }
  //#endregion
}
