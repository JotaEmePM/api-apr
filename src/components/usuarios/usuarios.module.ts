import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsuariosSchema, Usuarios } from './schemas/usuarios.schema'
import { UsuariosController } from './usuarios.controller'
import { SecurityService } from 'src/services/security.services'
import { UsuariosService } from './Usuarios.services'
import { EmailService } from 'src/email/email.services'
import { HttpModule, HttpService } from '@nestjs/axios'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuarios.name, schema: UsuariosSchema },
    ]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, SecurityService, EmailService],
})
export class UsuariosModule {}
