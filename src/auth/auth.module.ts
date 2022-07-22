import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { SecurityService } from '../services/security.services'
import {
  Usuarios,
  UsuariosSchema,
} from 'src/components/usuarios/schemas/usuarios.schema'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuarios.name, schema: UsuariosSchema },
    ]),
    JwtModule.register({
      secret: 'sdfsdf',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SecurityService, JwtStrategy],
})
export class AuthModule {}
