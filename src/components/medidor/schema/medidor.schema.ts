import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type MedidorDocument = Medidor & Document

@Schema()
export class Medidor {
  @Prop()
  subdomain: string

  @Prop()
  nroSocio: string

  @Prop()
  codMedidor: string

  @Prop()
  direccion: string

  @Prop()
  arranque: string

  @Prop()
  fechaCreacion: Date

  @Prop()
  usuarioId: string
}

export const MedidorSchema = SchemaFactory.createForClass(Medidor)
