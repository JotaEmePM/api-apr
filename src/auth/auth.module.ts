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
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule } from '@nestjs/config'
import { jwtConstant } from './jwt.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuarios.name, schema: UsuariosSchema },
    ]),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '24h' },
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, SecurityService, JwtStrategy],
})
export class AuthModule {}
