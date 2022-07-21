import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import * as saltHash from 'password-salt-and-hash'

@Injectable()
export class SecurityService {
  async generateGUID(): Promise<string> {
    return uuidv4()
  }

  async generateSaltHash(password: string): Promise<any> {
    const hashPassword = saltHash.generateSaltHash(password)
    return hashPassword
  }

  async checkPassword(
    salt: string,
    hash: string,
    password: string
  ): Promise<boolean> {
    const isPasswordMatch = saltHash.verifySaltHash(salt, hash, password)
    return isPasswordMatch as boolean
  }
}
