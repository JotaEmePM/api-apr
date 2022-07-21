import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsBoolean, IsNotEmpty, IsNumber, MinLength } from 'class-validator'
import { Document } from 'mongoose'

export type UsertypeDocument = UserType & Document

@Schema()
export class UserType {
  @Prop()
  IdType: Number

  @Prop()
  @IsNotEmpty()
  Description: string

  @Prop()
  @IsBoolean()
  Enabled: boolean
}

export const UserTypeSchema = SchemaFactory.createForClass(UserType)
