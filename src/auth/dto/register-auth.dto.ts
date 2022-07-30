import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { LoginUserAuthDto } from './login-auth.dto'

export class RegisterAuthDto extends PartialType(LoginUserAuthDto) {
  @IsNotEmpty()
  name: string
}
