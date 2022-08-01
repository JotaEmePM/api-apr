import { ApiProperty } from "@nestjs/swagger"

export class CreateUsuariosDto {

  @ApiProperty()
  readonly Username: string

  @ApiProperty()
  readonly Email: string

  @ApiProperty()
  Rut: string

  @ApiProperty()
  readonly Nombre: string

  @ApiProperty()
  readonly Telefono: string

  @ApiProperty()
  readonly EsParticular: boolean

  @ApiProperty()
  readonly UserType: string

  @ApiProperty()
  readonly Password: string
}
