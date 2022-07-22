import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RegionDocument = Region & Document

@Schema()
export class Region {
  @Prop()
  region: string
  @Prop()
  region_number: string
  @Prop()
  region_iso_3166_2: string
  @Prop()
  provincias: Provincia[]
}

export class Provincia {
  @Prop()
  name: string
  @Prop()
  comunas: Comuna[]
}

export class Comuna {
  @Prop()
  name: string
  @Prop()
  code: string
}

export const RegionSchema = SchemaFactory.createForClass(Region)
