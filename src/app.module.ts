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
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { EmailModule } from './email/email.module'
import { APRModule } from './components/apr/apr.module'
import { I18nModule } from 'nestjs-i18n'
import { TestModule } from './components/test/test.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    UsuariosModule,
    RolModule,
    AuthModule,
    RegionModule,
    HealthModule,
    EmailModule,
    APRModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
