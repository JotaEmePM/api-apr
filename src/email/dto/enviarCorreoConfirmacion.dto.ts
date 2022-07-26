import { ApiProperty } from '@nestjs/swagger'

export class EnviarCorreoConfirmacionDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  token: string

  @ApiProperty()
  nombre: string

  @ApiProperty()
  userId: string
}
