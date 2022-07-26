import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { APRService } from './apr.service'
import { CreateAPRDto } from './dto/createAPR.dto'

@ApiTags('apr')
@Controller('apr')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class APRController {
  constructor(private readonly aprService: APRService) {}

  @Post()
  create(@Body() createAPRDto: CreateAPRDto) {
    console.log(createAPRDto)
    return this.aprService.create(createAPRDto)
  }

  @Get()
  findAll() {
    return this.aprService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aprService.findOne(id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
  //   return this.regionService.update(+id, updateRegionDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.regionService.remove(+id)
  // }
}
