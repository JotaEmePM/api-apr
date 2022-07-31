import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { ResponseValueDto } from 'src/dto/response.dto'
import { AuthService } from './auth.service'
// import { RegisterAuthDto } from './dto/register-auth.dto'
import { LoginUserAuthDto } from './dto/login-auth.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginUserAuthDto })
  @ApiCreatedResponse({
    description: 'Metadata de conexión y token',
    type: ResponseValueDto,
  })
  async loginUser(
    @Body() userObjectLogin: LoginUserAuthDto
  ): Promise<ResponseValueDto> {
    const response = await this.authService.loginUser(userObjectLogin)
    return response
  }
}
