import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { APR, APRSchema } from './schema/apr.schema'
import { APRController } from './apr.controller'
import { APRService } from './apr.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: APR.name, schema: APRSchema }])],
  controllers: [APRController],
  providers: [APRService],
})
export class APRModule {}
