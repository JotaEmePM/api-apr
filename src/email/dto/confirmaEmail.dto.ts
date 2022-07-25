import { ApiProperty } from '@nestjs/swagger'

export class ConfirmaEmailDto {
  @ApiProperty()
  token: string

  @ApiProperty()
  userId: string
}
