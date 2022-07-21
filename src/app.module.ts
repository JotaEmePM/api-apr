import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsuariosModule } from './components/usuarios/usuarios.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jotaemepm:_8xqF4ryPsh35Kv@cluster0.aoefb.mongodb.net/apr?retryWrites=true&w=majority'
    ),
    UsuariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
