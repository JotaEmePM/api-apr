import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UsuarioDocument = Usuario & Document

@Schema()
export class Usuario {
  @Prop()
  name: string

  @Prop()
  age: number

  @Prop()
  breed: string

  @Prop()
  passwordHistory: PasswordHistory[]

  @Prop()
  hola: string[]
}

export class PasswordHistory {
  @Prop()
  password: string

  @Prop()
  text: string
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario)
