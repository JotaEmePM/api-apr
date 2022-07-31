import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { APR, APRSchema } from '../apr/schema/apr.schema'
import { Medidor, MedidorSchema } from './schema/medidor.schema'
import { MedidorService } from './medidor.service'
import { MedidorController } from './medidor.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Medidor.name, schema: MedidorSchema }]),
    MongooseModule.forFeature([{ name: APR.name, schema: APRSchema }]),
  ],
  controllers: [MedidorController],
  providers: [MedidorService],
})
export class MedidorModule {}
