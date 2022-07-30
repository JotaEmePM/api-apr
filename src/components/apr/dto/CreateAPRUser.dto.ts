import { ApiProperty } from '@nestjs/swagger'

export class CreateAPRUserDto {
  @ApiProperty()
  subdomainId: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  rolId: string

  private enabled = true
}
