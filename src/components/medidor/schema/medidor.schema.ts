import { Prop, Schema } from '@nestjs/mongoose'

@Schema()
export class Medidor {
  @Prop()
  codigo: string

  // @Prop()
}
