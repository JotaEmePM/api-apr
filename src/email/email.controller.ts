import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { EnviarCorreoConfirmacionDto } from './dto/enviarCorreoConfirmacion.dto'
import { EmailService } from './email.services'

@Controller('email')
@ApiTags('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async EnviarCorreo(@Body() correoConfirmacion: EnviarCorreoConfirmacionDto) {
    return await this.emailService.EnviarEmailConfirmacion(correoConfirmacion)
  }
}
