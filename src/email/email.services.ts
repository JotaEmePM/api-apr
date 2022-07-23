import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { EnviarCorreoConfirmacion } from './dto/enviarCorreoConfirmacion.dto'
import qs from 'qs'

@Injectable()
export class EmailService {
  constructor(private readonly httpService: HttpService) {}

  async EnviarEmailConfirmacion(
    enviarCorreoConfirmacion: EnviarCorreoConfirmacion
  ): Promise<boolean> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-API-KEY':
        'AP7EAppTJNIqF99nohOtwqwKEbTcIaHlFOLsJbqGI7Bl97kxCEbmv4s7RBHKK31UaXUwKFl9fN1WLEiXsjVSDw5YEPIv2ZDkQXAvpQUMfDpNh3VL3jJBLgFdoM2n7xCx',
    }

    const params = qs.stringify({
      from: 'test@empresa.cl',
      to: enviarCorreoConfirmacion.email,
      subject: 'Confirmación de correo',
      body: 'hola-' + enviarCorreoConfirmacion.token,
    })

    this.httpService.axiosRef
      .post('https://api.mailbaby.net/mail/send', params, { headers })
      .catch(_error => {
        throw new HttpException('BAD_EMAIL_REQUEST', HttpStatus.BAD_REQUEST)
      })
    return true
  }
}
