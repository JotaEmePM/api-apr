import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, MaxLength, MinLength } from 'class-validator'

export class LoginAuthDto {
  @ApiProperty({
    name: 'Email',
    description: 'Email del usuario registrado',
    required: true,
    type: String,
  })
  @IsEmail()
  email: string

  @ApiProperty({
    name: 'password',
    description: 'Password no encriptada del usuario',
    required: true,
    type: String,
  })
  @MinLength(4)
  @MaxLength(12)
  password: string
}
