import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ArrayMinSize, IsDate, IsEmail, IsNotEmpty } from 'class-validator'
import { Document } from 'mongoose'

export type UsuariosDocument = Usuarios & Document

@Schema()
export class Usuarios {
  @Prop()
  @IsNotEmpty()
  Username: string

  @Prop()
  @IsEmail()
  @IsNotEmpty()
  Email: string

  @Prop()
  @IsNotEmpty()
  Rut: string

  @Prop()
  @IsNotEmpty()
  Nombre: string

  @Prop()
  Telefono: string

  @Prop()
  @IsNotEmpty()
  Password: number

  @Prop()
  @IsNotEmpty()
  EsParticular: boolean

  @Prop()
  EmailVerificado: boolean

  @Prop()
  EmailToken: string

  @Prop()
  Habilitado: boolean

  @Prop()
  @ArrayMinSize(1)
  UserType: string[]

  @Prop()
  @IsDate()
  CreatedAt: Date

  @Prop()
  @ArrayMinSize(1)
  PasswordHistory: PasswordHistory[]
}

export class PasswordHistory {
  @Prop()
  Id: number

  @Prop()
  @IsNotEmpty()
  Hash: string

  @Prop()
  @IsNotEmpty()
  Salt: string

  @Prop()
  FechaCreacion: Date

  @Prop()
  FechaExpiracion: Date
}

export const UsuariosSchema = SchemaFactory.createForClass(Usuarios)
