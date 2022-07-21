import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserType, UserTypeSchema } from './schemas/usertype.schema'
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
