import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RolDocument = Rol & Document

@Schema()
export class Rol {
  @Prop()
  Nombre: string

  @Prop()
  Descripcion: string

  @Prop()
  Habilitado: boolean
}

export const RolSchema = SchemaFactory.createForClass(Rol)
