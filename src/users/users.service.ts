import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { UserRole } from './enum/user-roles.enum';

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
      return await this.createUserWithRole(createUserDto);
    } catch (err: any) {
      if (err.code == 23505) {
        throw new ConflictException('E-mail already registered');
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
      const userToUpdate = {} as UpdateUserDto;
      for (const key in user) {
        if (updateUserDto[key] && user[key] != updateUserDto[key]) {
          userToUpdate[key] = updateUserDto[key];
        } else {
          userToUpdate[key] = user[key];
        }
      }
      await this.deleteUserAndRelationsByRole(id, user.role);
      return await this.updateUserWithRole(userToUpdate);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  private async createUserWithRole(
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

  private async updateUserWithRole(updateUserDto: UpdateUserDto) {
    const { role } = updateUserDto;
    switch (role) {
      case 'Student':
        return this.studentService.update(updateUserDto);
      case 'Teacher':
        return this.teacherService.update(updateUserDto);
      case 'Admin':
        return this.adminService.update(updateUserDto);
    }
  }

  private async deleteUserAndRelationsByRole(id: string, role: UserRole) {
    switch (role) {
      case 'Student':
        return this.studentService.remove(id);
      case 'Teacher':
        return this.teacherService.remove(id);
      case 'Admin':
        return this.adminService.remove(id);
    }
  }
}
