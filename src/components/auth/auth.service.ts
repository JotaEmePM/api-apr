import { Injectable } from "@nestjs/common";
import { UsuariosService } from "../usuarios/Usuarios.services";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsuariosService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneBy("Email", email)

    if(user && user[0].password === pass) {
      const { Password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return{
      access_token: this.jwtService.sign(payload)
    }
  }
}
