import { ApiProperty } from '@nestjs/swagger'

export class NewMedidorDto {
  @ApiProperty()
  subdomain: string
  @ApiProperty()
  nroSocio: string
  @ApiProperty()
  codMedidor: string
  @ApiProperty()
  direccion: string
  @ApiProperty()
  arranque: string
  @ApiProperty()
  usuarioId: string
}
