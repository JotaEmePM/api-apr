import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsBoolean } from 'class-validator'

export type APRUserDocument = APRUser & Document

@Schema()
export class APRUser {
  @Prop()
  subdomainId: string

  @Prop()
  userId: string

  @Prop()
  rolId: string

  @Prop()
  @IsBoolean()
  enabled: boolean
}

export const APRUserSchema = SchemaFactory.createForClass(APRUser)
