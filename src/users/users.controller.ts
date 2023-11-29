import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from './dto/find-one-params.dto';
import { UpdateParams } from './dto/update-user-param.dto';
import { RemoveParams } from './dto/remove-params.dto';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all users.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific user by ID.' })
  findOne(@Param() params: CommonGetIdDto) {
    const { id } = params;
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update details of a specific user by ID.' })
  update(
    @Param() params: CommonGetIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { id } = params;
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific user by ID.' })
  remove(@Param() params: CommonGetIdDto) {
    const { id } = params;
    return this.usersService.remove(id);
  }
}
