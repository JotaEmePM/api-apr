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

  // @Post('register')
  // registerUser(@Body() userObject: RegisterAuthDto) {
  //   console.log({ body: userObject })
  // }
  @Post('login')
  @ApiBody({ type: LoginUserAuthDto })
  // @ApiResponse({ status: 201, description: 'Usuario conectado correctamente' })
  // @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'Metadata de conexión y token',
    type: ResponseValueDto,
  })
  async loginUser(
    @Body() userObjectLogin: LoginUserAuthDto
  ): Promise<ResponseValueDto> {
    const response = await this.authService.loginUser(userObjectLogin)
    if (response && !response.IsError) {
      return response
    } else {
      return response
    }
  }
}
