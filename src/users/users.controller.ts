import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from './dto/find-one-params.dto';
import { UpdateParams } from './dto/update-user-param.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 403, description: 'Forbidden'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    const {id} = params;
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param() param: UpdateParams, @Body() updateUserDto: UpdateUserDto) {
    
    return this.usersService.update(param.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    const {id, role} = params;
    return this.usersService.remove(id,role);
  }
}
