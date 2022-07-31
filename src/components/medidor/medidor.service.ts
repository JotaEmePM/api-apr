import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ResponseValueDto } from 'src/dto/response.dto'
import { Medidor } from './schema/medidor.schema'
import { NewMedidorDto } from './dto/newMedidor.dto'
import { APR } from '../apr/schema/apr.schema'

@Injectable()
export class MedidorService {
  constructor(
    @InjectModel(Medidor.name)
    private readonly medidorModel: Model<Medidor>,

    @InjectModel(APR.name)
    private readonly aprModel: Model<APR>
  ) {}

  async create(createMedidorDto: NewMedidorDto): Promise<ResponseValueDto> {
    try {
      const aprExist = await this.aprModel.findOne({
        subdomain: createMedidorDto.subdomain,
      })
      if (!aprExist)
        return new ResponseValueDto(true, 'MEDIDOR_APRNOEXIST', null)

      const nroSocioExist = await this.medidorModel.findOne({
        nroSocio: createMedidorDto.nroSocio,
      })
      if (nroSocioExist)
        return new ResponseValueDto(true, 'MEDIDOR_NROSOCIOEXIST', null)

      const codMedidorExist = await this.medidorModel.findOne({
        codMedidor: createMedidorDto.codMedidor,
      })
      if (codMedidorExist)
        return new ResponseValueDto(true, 'MEDIDOR_CODMEDIDOREXIST', null)

      return new ResponseValueDto(false, 'MEDIDOR_CREATED', {
        apr: await this.medidorModel.create(createMedidorDto),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'MEDIDOR_ERRORCREATION', {
        error,
      })
    }
  }

  async findAll(): Promise<ResponseValueDto> {
    try {
      return new ResponseValueDto(false, 'MEDIDOR_LISTOK', {
        medidores: await this.medidorModel.find().exec(),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'MEDIDOR_LISTERROR', {
        error,
      })
    }
  }

  async findOne(id: string): Promise<ResponseValueDto> {
    try {
      return new ResponseValueDto(false, 'MEDIDOR_GETOK', {
        aprs: await this.medidorModel.find({ _id: id }).exec(),
      })
    } catch (error) {
      return new ResponseValueDto(true, 'MEDIDOR_GETERROR', {
        error,
      })
    }
  }

  async findAllBySubdomain(domain: string): Promise<ResponseValueDto> {
    try {
      const medidores = await this.medidorModel
        .find({ subdomain: domain })
        .exec()
      return new ResponseValueDto(false, 'APR_LISTOK', {
        medidores,
      })
    } catch (error) {
      return new ResponseValueDto(true, 'APR_LISTERROR', {
        error,
      })
    }
  }
}
