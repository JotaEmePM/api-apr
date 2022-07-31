import { Controller, Post, Body, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUsuariosDto } from '../usuarios/dto/create-usuarios.dto'
import { CheckPasswordDto } from './dto/checkpassword.dto'
import { passwordStrength } from 'check-password-strength'

@Controller('test')
@ApiTags('test')
export class TestController {
  @Post()
  async post(@Body() dto: CheckPasswordDto) {
    return passwordStrength(dto.password)
  }
}
