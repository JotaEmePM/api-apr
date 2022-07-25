import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { EnviarCorreoConfirmacionDto } from './dto/enviarCorreoConfirmacion.dto'
import fetch from 'node-fetch'
import { ConfirmaEmailDto } from './dto/confirmaEmail.dto'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import {
  Usuarios,
  UsuariosDocument,
} from 'src/components/usuarios/schemas/usuarios.schema'

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(Usuarios.name)
    private readonly userModel: Model<UsuariosDocument>,
    private readonly httpService: HttpService
  ) {}

  async ConfirmarEmail(confirmaEmailDto: ConfirmaEmailDto): Promise<boolean> {
    const findUser = await this.userModel.findOne({
      _id: confirmaEmailDto.userId,
    })

    if (findUser.EmailVerificado) return true

    if (!findUser)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)

    if (findUser.EmailToken !== confirmaEmailDto.token)
      throw new HttpException('INVALID_TOKEN', HttpStatus.BAD_REQUEST)

    findUser.EmailVerificado = true
    findUser.save()

    return true
  }

  async EnviarEmailConfirmacion(
    enviarCorreoConfirmacion: EnviarCorreoConfirmacionDto
  ): Promise<boolean> {
    const getTemplate: string = await this.getEmailConfirmationCode()
    const template = getTemplate
      .replace(
        new RegExp('~~URL~~', 'g'),
        process.env.EMAILCONFIRMATION_URL +
          enviarCorreoConfirmacion.token +
          '&userId=' +
          enviarCorreoConfirmacion.userId
      )
      .replace('~~URLAYUDA~~', process.env.HELP_URL)

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-API-KEY': process.env.EMAIL_APIKEY,
    }

    const params = new URLSearchParams()

    params.append('from', process.env.EMAILCONFIRMATION_FROM)
    params.append('to', enviarCorreoConfirmacion.email)
    params.append('subject', process.env.EMAILCONFIRMATION_SUBJECT)
    params.append('body', template)
    this.httpService
      .post(process.env.EMAILCONFIRMATION_APIURL, params, { headers })
      .subscribe(data => {
        console.log(data)
      })
    // .catch(error => {
    //   throw new HttpException(
    //     `[BAD_EMAIL_REQUEST][${error}]`,
    //     HttpStatus.BAD_REQUEST
    //   )
    // })
    return true
  }

  private async getEmailConfirmationCode(): Promise<string> {
    try {
      const response = await fetch(process.env.EMAILCONFIRMATION_PATH)
      const buff = await response.arrayBuffer().then(Buffer.from)
      return buff.toString()
      // switch (buff.toString()) {
      //   // status "OK"
      //   case 200:
      //     return await buff.text()
      //   // status "Not Found"
      //   case 404:
      //     console.log('Not Found')
      //     return 'NOTFOUND'
      // }
    } catch (error) {
      return 'ENOENT'
    }
  }
}
