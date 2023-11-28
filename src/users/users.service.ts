import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AdminsService } from './admins/admins.service';
import { StudentsService } from './students/students.service';
import { TeachersService } from './teachers/teachers.service';
import { Student } from './students/entities/student.entity';
import { Teacher } from './teachers/entities/teacher.entity';
import { Admin } from './admins/entities/admin.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(AdminsService)
    private readonly adminService: AdminsService,
    @Inject(TeachersService)
    private readonly teacherService: TeachersService,
    @Inject(StudentsService)
    private readonly studentService: StudentsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return this.createUserWithRole(createUserDto);
    } catch (err: any) {
      if (err.code == 23505) {
        throw new ConflictException('E-mail já cadastrado');
      } else {
        throw err;
      }
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { role } = updateUserDto;
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    if (role === user.role) {
      for (const key in updateUserDto) {
        if (updateUserDto[key]) {
          user[key] = updateUserDto[key];
        }
      }
      return await this.userRepository.save(user);
    } else {
      await this.remove(id);
      return await this.createUserWithRole({
        email: updateUserDto.email,
        password: updateUserDto.password,
        role: updateUserDto.role,
      });
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  private createUserWithRole(
    createUserDto: CreateUserDto,
  ): Promise<Admin | Student | Teacher> {
    const { role } = createUserDto;
    switch (role) {
      case 'Student':
        return this.studentService.create(createUserDto);
      case 'Teacher':
        return this.teacherService.create(createUserDto);
      case 'Admin':
        return this.adminService.create(createUserDto);
    }
  }
  

}
