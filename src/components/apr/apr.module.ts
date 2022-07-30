import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { APR, APRSchema } from './schema/apr.schema'
import { APRController } from './apr.controller'
import { APRService } from './apr.service'
import { APRUser, APRUserSchema } from './schema/aprUser.schema'
import { APRUserController } from './aprUser.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: APR.name, schema: APRSchema }]),
    MongooseModule.forFeature([{ name: APRUser.name, schema: APRUserSchema }]),
  ],
  controllers: [APRController, APRUserController],
  providers: [APRService],
})
export class APRModule {}
