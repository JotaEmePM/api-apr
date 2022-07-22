import { Controller, Get, Param } from '@nestjs/common'
import { RolService } from './rol.service'
import { CreateRolDto } from './dto/create-rol.dto'
import { Rol } from './schemas/rol.schema'
import { ApiTags } from '@nestjs/swagger'

@Controller('rol')
@ApiTags('Rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  // @Post()
  // async create(@Body() createRolDto: CreateRolDto) {
  //   await this.rolService.create(createRolDto)
  // }

  @Get()
  async findAll(): Promise<Rol[]> {
    return this.rolService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rol> {
    return this.rolService.findOne(id)
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.rolService.delete(id)
  // }
}
