import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UsuariosDocument = Usuarios & Document

@Schema()
export class Usuarios {
  @Prop()
  Username: string

  @Prop()
  Email: string

  @Prop()
  Rut: string

  @Prop()
  Nombre: string

  @Prop()
  Telefono: string

  @Prop()
  Password: number

  @Prop()
  EsParticular: boolean

  @Prop()
  EmailVerificado: boolean

  @Prop()
  EmailToken: string

  @Prop()
  Habilitado: boolean

  @Prop()
  UserType: string[]

  @Prop()
  CreatedAt: Date

  @Prop()
  PasswordHistory: PasswordHistory[]
}

export class PasswordHistory {
  @Prop()
  Id: number

  @Prop()
  Hash: string

  @Prop()
  Salt: string

  @Prop()
  FechaCreacion: Date

  @Prop()
  FechaExpiracion: Date
}

export const UsuariosSchema = SchemaFactory.createForClass(Usuarios)
