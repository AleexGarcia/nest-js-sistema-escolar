import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindOneParams } from './dto/find-one-params.dto';
import { UpdateParams } from './dto/update-user-param.dto';
import { findAllByRoleParam } from './dto/find-all-by-role-parms.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':role')
  findAllByRole(@Param() param: findAllByRoleParam) {
    return this.usersService.findAllByRole(param.role);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':role/:id')
  findOne(@Param() params: FindOneParams) {
    const {id, role} = params;
    return this.usersService.findOne(id,role);
  }

  @Patch(':id')
  update(@Param() param: UpdateParams, @Body() updateUserDto: UpdateUserDto) {
    
    return this.usersService.update(param.id, updateUserDto);
  }

  @Delete(':role/:id')
  remove(@Param() params: FindOneParams) {
    const {id, role} = params;
    return this.usersService.remove(id,role);
  }
}
