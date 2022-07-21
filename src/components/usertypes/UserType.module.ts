import { Module } from '@nestjs/common'
import { MongooseModule, Schema } from '@nestjs/mongoose'
import { UserType } from '../usertypes/schemas/usertype.schema'
import { UserTypeSchema } from '../usertypes/schemas/usertype.schema'
import { UserTypeController } from '../usertypes/UserType.controller'
import { UserTypeService } from '../usertypes/UserType.Services'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserType.name, schema: UserTypeSchema },
    ]),
  ],
  controllers: [UserTypeController],
  providers: [UserTypeService],
})
export class UserTypeModule {}
