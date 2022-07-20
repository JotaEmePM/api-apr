import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsuarioModule } from './usuario/usuario.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jotaemepm:_8xqF4ryPsh35Kv@cluster0.aoefb.mongodb.net/?retryWrites=true&w=majority'),
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
