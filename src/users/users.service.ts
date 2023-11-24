import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './enum/user-roles.enum';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { Admin } from './entities/admin.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password, role } = createUserDto;
      const user = this.createUserWithRole(email,password,role);
      return this.userRepository.save(user);

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
    return;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { currentRole, newRole } = updateUserDto;
  }

  async remove(id: string, role: UserRole) {}

  private createUserWithRole(email: string, password: string,role: UserRole) {
    switch (role) {
      case 'Student':
        return new Student(email,password);
      case 'Teacher':
        return new Teacher(email,password);
      case 'Admin':
        return new Admin(email,password);
    }
  }

}
