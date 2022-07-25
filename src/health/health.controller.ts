import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
} from '@nestjs/terminus'

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongoose: MongooseHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.http.pingCheck('google-ping', 'https://google.com'),
      async () =>
        this.http.pingCheck('emailbaby-ping', 'https://api.mailbaby.net/ping'),
      async () => this.mongoose.pingCheck('mongoose'),
    ])
  }
}
