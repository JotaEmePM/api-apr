import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  // Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('APR API')
    .setDescription('APR API Descripción')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true,
    })
  )

  await app.listen(process.env.PORT || 8080)
}
bootstrap()
