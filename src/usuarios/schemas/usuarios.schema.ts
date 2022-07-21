import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Usuarios {

}

export const UsuariosSchema = SchemaFactory.createForClass(Usuarios)
