import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './enum/user-roles.enum';
import { Teacher } from './teachers/entities/teacher.entity';
import { Admin } from './admins/entities/admin.entity';
import { Student } from './students/entities/student.entity';


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
    return this.userRepository.findOne({where:{id: id}});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const {role } = updateUserDto;
    const user = await this.findOne(id);
    if(!user) throw new Error('Invalid id');

    if(role === user.role){
      
    }
    
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  private createUserWithRole(email: string, password: string, role: UserRole) {
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
