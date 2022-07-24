import { ApiProperty } from '@nestjs/swagger'

export class ResponseDto {
  @ApiProperty()
  public IsError: boolean

  @ApiProperty()
  public Message: string

  constructor(isError: boolean, message: string) {
    this.IsError = isError
    this.Message = message
  }
}

export class ResponseValueDto extends ResponseDto {
  @ApiProperty()
  Value: any = null

  constructor(isError: boolean, message: string, value: any) {
    super(isError, message)
    this.Value = value
  }
}
