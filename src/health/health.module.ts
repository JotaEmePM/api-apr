import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HttpModule } from '@nestjs/axios'
import { HealthController } from './health.controller'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    MongooseModule.forRoot(
      'mongodb+srv://jotaemepm:_8xqF4ryPsh35Kv@cluster0.aoefb.mongodb.net/apr?retryWrites=true&w=majority'
    ),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
