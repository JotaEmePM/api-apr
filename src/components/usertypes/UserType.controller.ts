import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common'
import { UserTypeService } from './UserType.Services'
import { UserType } from './schemas/usertype.schema'
import { ResponseDto, ResponseValueDto } from 'src/dto/response.dto'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserTypeDto } from './dto/create-usertype.dto'

@Controller('UserType')
@ApiTags('UserType')
export class UserTypeController {
  constructor(private readonly usertypeService: UserTypeService) {}

  @Get()
  async findAll(@Res() res): Promise<ResponseValueDto> {
    return res.status(HttpStatus.OK).json(new ResponseValueDto(false, "UserType List", this.usertypeService.findAll()))
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res): Promise<ResponseValueDto> {
    return res.status(HttpStatus.OK).json(new ResponseValueDto(false, "UserType by Id: " + id, this.usertypeService.findOne(id)))
  }

  @Post()
  async create(@Body() createUserTypeDto: CreateUserTypeDto, @Res() response) {
    return this.usertypeService.create(createUserTypeDto)
  }
}
