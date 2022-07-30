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
import { jwtConstant } from './jwt.constants'
import { APR, APRSchema } from '../components/apr/schema/apr.schema'
import {
  APRUser,
  APRUserSchema,
} from 'src/components/apr/schema/aprUser.schema'
import { Rol } from 'src/components/roles/schemas/rol.schema'
import { RolSchema } from '../components/roles/schemas/rol.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuarios.name, schema: UsuariosSchema },
    ]),
    MongooseModule.forFeature([{ name: APR.name, schema: APRSchema }]),
    MongooseModule.forFeature([{ name: APRUser.name, schema: APRUserSchema }]),
    MongooseModule.forFeature([{ name: Rol.name, schema: RolSchema }]),
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
