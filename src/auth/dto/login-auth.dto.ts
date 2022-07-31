import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginUserAuthDto {
  @ApiProperty({
    name: 'email',
    description: 'Email del usuario registrado',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
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

  @ApiProperty({
    name: 'subdomain',
    description: 'subdominio a conectar',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  subdomain: string
}
