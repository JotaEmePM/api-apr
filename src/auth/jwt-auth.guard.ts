import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // const [req] = context.getArgs()
    // const { rolId } = this.parseJwt(
    //   req.headers.authorization.replace('Bearer ', '')
    // )
    // if (rolId !== '62d9b6b719458b5009479d12') return false

    return super.canActivate(context)
  }
}

@Injectable()
export class JwtAuthGuardAdmin extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const [req] = context.getArgs()
    const { rolId } = this.parseJwt(
      req.headers.authorization.replace('Bearer ', '')
    )
    if (rolId !== '62d9b6b719458b5009479d12') return false

    return super.canActivate(context)
  }

  parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  }
}
