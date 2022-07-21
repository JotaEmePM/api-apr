export class ResponseDto {
  IsError: boolean
  Message: string
}

export class ResponseValueDto extends ResponseDto {
  Value: any
}
