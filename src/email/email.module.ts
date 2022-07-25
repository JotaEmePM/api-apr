import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { EmailService } from './email.services'
import { EmailController } from './email.controller'
import { MongooseModule } from '@nestjs/mongoose'
import {
  Usuarios,
  UsuariosSchema,
} from 'src/components/usuarios/schemas/usuarios.schema'

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
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
