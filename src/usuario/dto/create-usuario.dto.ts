export class CreateUsuarioDto {
  readonly name: string
  readonly age: string
  readonly breed: string
  readonly passwordHistory: PasswordHistoryDto[]
  readonly hola: string[]
}

export class PasswordHistoryDto {
  readonly password: string
  readonly text: string
}
