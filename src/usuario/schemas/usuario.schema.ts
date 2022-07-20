import * as mongoose from 'mongoose'

export const UsuarioSchema = new mongoose.Schema({
  name: String,
  email: String,
  rut: String
});
