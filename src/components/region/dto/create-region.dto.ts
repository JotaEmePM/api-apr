export class CreateRegionDto {
  region: string
  region_number: string
  region_iso_3166_2: string
  provincias: CreateProvinciaDto[]
}

export class CreateProvinciaDto {
  name: string
  comunas: CreateComunaDto[]
}

export class CreateComunaDto {
  name: string
  code: string
}
