export class ResponseDto {
  // public IsError: boolean = false
  // public Message: string = ''

  constructor(public IsError: boolean, public Message: string) {}
}

export class ResponseValueDto extends ResponseDto {
  // Value: any = null
  constructor(
    public IsError: boolean,
    public Message: string,
    public Value: any
  ) {
    super(IsError, Message)
  }
}
