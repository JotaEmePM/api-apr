import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ArrayMinSize, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, isString, MinLength } from 'class-validator'
import { Document } from 'mongoose'

export type UsertypeDocument = UserType & Document

@Schema()
export class UserType {
  @Prop()
  @IsNotEmpty()
  @IsNumber()
  IdType: Number

  @Prop()
  @IsNotEmpty()
  @MinLength(3)
  Description: string

  @Prop()
  @IsBoolean()
  Enabled: boolean
}

export const UserTypeSchema = SchemaFactory.createForClass(UserType)
