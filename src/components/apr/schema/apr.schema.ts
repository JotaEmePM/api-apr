import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type APRDocument = APR & Document

@Schema()
export class APR {
  @Prop()
  subdomain: string

  @Prop()
  nombre: string

  @Prop()
  rut: string

  @Prop()
  enabled: boolean

  @Prop()
  direccion: string

  @Prop()
  comuna_code: string

  @Prop()
  boleta_text: string

  @Prop()
  telefono: string

  @Prop()
  banco: string

  @Prop()
  tipoCuenta: TipoCuenta

  @Prop()
  nroCuenta: string

  @Prop()
  createdAt: Date

  @Prop()
  createdBy: string
}

export enum TipoCuenta {
  CORRIENTE = 'CORRIENTE',
  VISTA = 'VISTA',
  AHORRO = 'AHORRO',
}

export const APRSchema = SchemaFactory.createForClass(APR)
