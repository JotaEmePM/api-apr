import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { MedidorService } from './medidor.service'
import { NewMedidorDto } from './dto/newMedidor.dto'
import { ResponseValueDto } from '../../dto/response.dto'
import { PaginationParams } from '../core/pagination-params'

@ApiTags('medidor')
@Controller('medidor')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class MedidorController {
  constructor(private readonly medidorService: MedidorService) {}

  @Post()
  @ApiBody({ type: NewMedidorDto })
  @ApiCreatedResponse({
    description: 'Datos de nuevo medidor',
    type: ResponseValueDto,
  })
  create(@Body() newMedidorDto: NewMedidorDto) {
    return this.medidorService.create(newMedidorDto)
  }

  @Get()
  findAll(@Query() { skip, limit}: PaginationParams) {
    return this.medidorService.findAll(skip, limit)
  }

  @Get(':domain')
  findAllByAPR(@Param('domain') req: string) {
    return this.medidorService.findAllBySubdomain(req)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medidorService.findOne(id)
  }
}
