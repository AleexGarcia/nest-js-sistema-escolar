import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { Admin } from './entities/admin.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;
    const basicUser = new User(email, password, role);
    try {
      return await this.createUserWithRole(basicUser);
    } catch (err: any) {
      if (err.code == 23505) {
        throw new ConflictException('E-mail já cadastrado');
      } else {
        throw err;
      }
    }
  }

  async findAll() {

    const students = await this.findAllStudent()
    const teachers = await this.findAllTeachers()
    const admins = await this.findAllAdmin();

    return [].concat(students,teachers,admins);
    
  }


  async findAllStudent() {
    return this.studentRepository.find();
  }

  async findAllTeachers() {
    return this.teacherRepository.find();
  }

  async findAllAdmin() {
    return this.adminRepository.find();
  }

  findOne(id: string, role: string) {
    try{
      return this.selectRepositoryByRole(role).findOne({where:{
        user: {
          id: id,
        }
      }})
    }catch(error: any){
      console.log(error);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private createUserWithRole(
    basicUser: User,
  ): Promise<Student | Teacher | Admin> {
    if (basicUser.role === 'student') {
      const user = new Student();
      user.user = basicUser;
      return this.studentRepository.save(user);
    } else if (basicUser.role === 'teacher') {
      const user = new Teacher();
      user.user = basicUser;
      return this.teacherRepository.save(user);
    } else if (basicUser.role === 'admin') {
      const user = new Admin();
      user.user = basicUser;
      return this.adminRepository.save(user);
    } else {
      new Error('Invalid Role');
    }
  }

  private selectRepositoryByRole(role: string){
    switch(role){
      case 'student':
        return this.studentRepository;
      case 'teacher':
        return this.teacherRepository;
      case 'admin':
        return this.adminRepository;
      default:
        throw Error('Invalid Role');
    }
  }

}
