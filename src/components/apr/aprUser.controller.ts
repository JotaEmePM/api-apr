import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ResponseValueDto } from 'src/dto/response.dto'
import { APRService } from './apr.service'
import { CreateAPRUserDto } from './dto/CreateAPRUser.dto'

@ApiTags('apruser')
@Controller('apruser')
@ApiBearerAuth()
//@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class APRUserController {
  constructor(private readonly aprService: APRService) {}

  @Post()
  @ApiBody({ type: CreateAPRUserDto })
  @ApiCreatedResponse({
    description: 'Datos de nuevo usuario en APR',
    type: ResponseValueDto,
  })
  create(@Body() createAPRUserDto: CreateAPRUserDto) {
    console.log(createAPRUserDto)
    return this.aprService.createAPRUser(createAPRUserDto)
  }

  @Get()
  findAll() {
    return this.aprService.findAll()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.aprService.findOne(id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
  //   return this.regionService.update(+id, updateRegionDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.regionService.remove(+id)
  // }
}
