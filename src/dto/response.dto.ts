export class ResponseDto {
  IsError: boolean = false
  Message: string = ''
}

export class ResponseValueDto extends ResponseDto {
  Value: any = null
}
