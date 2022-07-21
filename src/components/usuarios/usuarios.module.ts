import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsuariosSchema, Usuarios } from './schemas/usuarios.schema'
import { UsuariosController } from './usuarios.controller'
import { SecurityService } from 'src/services/security.services'
import { UsuariosService } from './Usuarios.services'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuarios.name, schema: UsuariosSchema },
    ]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, SecurityService],
})
export class UsuariosModule {}
