import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common'
import { UserTypeService } from './UserType.Services'
import { UserType } from './schemas/usertype.schema'
import { ResponseDto, ResponseValueDto } from 'src/dto/response.dto'

@Controller('usuario')
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
}
