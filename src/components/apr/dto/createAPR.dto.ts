import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { TipoCuenta } from '../schema/apr.schema'

export class CreateAPRDto {
  @ApiProperty()
  subdomain: string

  @ApiProperty()
  nombre: string

  @ApiProperty()
  rut: string

  @ApiProperty()
  direccion: string

  @ApiProperty()
  comuna_code: string

  @ApiProperty()
  boleta_text: string

  @ApiProperty()
  telefono: string

  @ApiProperty()
  banco: string

  @ApiProperty()
  @IsEnum(TipoCuenta)
  tipoCuenta: TipoCuenta

  @ApiProperty()
  nroCuenta: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  createdBy: string
}
