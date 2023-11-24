import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from './dto/find-one-params.dto';
import { UpdateParams } from './dto/update-user-param.dto';
import { RemoveParams } from './dto/remove-params.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({summary: 'Create user'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
  @ApiOperation({summary: 'FindAll user'})
  findAll() {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({summary: 'FindOne user'})
  findOne(@Param() params: FindOneParams) {
    const {id} = params;
    return this.usersService.findOne(id);
  }
  
  @Patch(':id')
  @ApiOperation({summary: 'Update user'})
  update(@Param() param: UpdateParams, @Body() updateUserDto: UpdateUserDto) {
    
    return this.usersService.update(param.id, updateUserDto);
  }
  
  @Delete(':id')
  @ApiOperation({summary: 'Remove user'})
  remove(@Param() params: RemoveParams) {
    const {id} = params;
    return this.usersService.remove(id);
  }
}
