import { Module } from '@nestjs/common'
import { MongooseModule, Schema } from '@nestjs/mongoose'
import { UserType } from './schemas/usertype.schema'
import { UserTypeSchema } from './schemas/usertype.schema'
import { UserTypeController } from './UserType.controller'
import { UserTypeService } from './UserType.Services'

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
