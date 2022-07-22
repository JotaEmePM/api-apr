import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { EmailService } from './email.services'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
