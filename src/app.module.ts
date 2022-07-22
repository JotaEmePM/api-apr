import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RolModule } from './components/roles/rol.module'
import { UsuariosModule } from './components/usuarios/usuarios.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { RegionModule } from './components/region/region.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jotaemepm:_8xqF4ryPsh35Kv@cluster0.aoefb.mongodb.net/apr?retryWrites=true&w=majority'
    ),
    UsuariosModule,
    RolModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    RegionModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
