import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('student')
  findAllStudent() {
    return this.usersService.findAllStudent();
  }
  @Get('teacher')
  findAllTeacher() {
    return this.usersService.findAllTeachers();
  }
  @Get('admin')
  findAllAdmin() {
    return this.usersService.findAllAdmin();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':role/:id')
  findOne(@Param('id') id: string , @Param('role') role: string) {
    return this.usersService.findOne(id, role);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
