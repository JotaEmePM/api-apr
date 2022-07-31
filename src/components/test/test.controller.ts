import { Controller, Post, Body, Res } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateUsuariosDto } from '../usuarios/dto/create-usuarios.dto'
import { CheckPasswordDto } from './dto/checkpassword.dto'
import { passwordStrength } from 'check-password-strength'

@Controller('test')
@ApiTags('test')
export class TestController {
  @Post('checkPasswordStrength')
  @ApiBody({ type: CheckPasswordDto })
  async post(@Body() dto: CheckPasswordDto) {
    return passwordStrength(dto.password)
  }
}
