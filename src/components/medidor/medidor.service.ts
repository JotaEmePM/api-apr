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
  ) { }

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

  async findAll(documentsToSkip = 0, limitOfDocuments?: number): Promise<ResponseValueDto> {
    try {
      if (limitOfDocuments) {
        const query = await this.aprModel
          .find()
          .sort({ _id: 1 })
          .skip(documentsToSkip)
          .limit(limitOfDocuments)

        return new ResponseValueDto(false, 'MEDIDOR_LISTOK', {
          medidores: query,
        })
      } else {
        const query = await this.aprModel
          .find()
          .sort({ _id: 1 })
          .skip(documentsToSkip)

        return new ResponseValueDto(false, 'MEDIDOR_LISTOK', {
          medidores: query,
        })
      }

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

  async findAllBySubdomain(domain: string, documentsToSkip = 0, limitOfDocuments?: number): Promise<ResponseValueDto> {
    try {
      if (limitOfDocuments) {
        const query = await this.aprModel
          .find({ subdomain: domain })
          .sort({ _id: 1 })
          .skip(documentsToSkip)
          .limit(limitOfDocuments)

        return new ResponseValueDto(false, 'MEDIDOR_LISTOK', {
          medidores: query,
        })
      } else {
        const query = await this.aprModel
          .find({ subdomain: domain })
          .sort({ _id: 1 })
          .skip(documentsToSkip)

        return new ResponseValueDto(false, 'MEDIDOR_LISTOK', {
          medidores: query,
        })
      }
    } catch (error) {
      return new ResponseValueDto(true, 'APR_LISTERROR', {
        error,
      })
    }
  }
}
