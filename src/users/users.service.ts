import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { Admin } from './entities/admin.entity';
import { UserRole } from './enum/user-roles.enum';

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
    const [students, teachers, admins] = await Promise.all([
      this.studentRepository.find(),
      this.teacherRepository.find(),
      this.adminRepository.find(),
    ]);
    const allUsers = [...students, ...teachers, ...admins];
    return allUsers;
  }

  findAllByRole(role: UserRole) {
    return this.selectRepositoryByRole(role).find();
  }

  async findOne(
    id: string,
    role: UserRole,
  ): Promise<Admin | Student | Teacher | null> {
    return this.selectRepositoryByRole(role).findOne({
      where: {
        user: {
          id: id,
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { currentRole, newRole } = updateUserDto;
    try {
      const userToUpdate = await this.findOne(id, currentRole);
      if (!userToUpdate) throw new Error(`Invalid ID | Role`);

      for (const [key, value] of Object.entries(updateUserDto)) {
        if (value) {
          if (key === 'newRole') {
            userToUpdate.user.role = value;
          } else if (key !== 'currentRole') {
            userToUpdate.user[key] = value;
          }
        }
      }
      if (newRole && currentRole !== newRole) {
        await this.remove(id, currentRole);
        return await this.createUserWithRole(userToUpdate.user);
      }
      return this.saveUserByRole(userToUpdate);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string, role: UserRole) {
    return this.selectRepositoryByRole(role).delete({
      user: {
        id: id,
      },
    });
  }

  private async createUserWithRole(
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
    }
  }

  private selectRepositoryByRole(role: UserRole) {
    const repositoryMapping = {
      student: this.studentRepository,
      teacher: this.teacherRepository,
      admin: this.adminRepository,
    };
    const selectedRepository = repositoryMapping[role];

    if (!selectedRepository) {
      throw new Error(`Repositório não encontrado para o papel "${role}"`);
    }

    return selectedRepository;
  }

  private async saveUserByRole(userToUpdate: Student | Teacher | Admin) {
    if (userToUpdate instanceof Student) {
      return this.studentRepository.save(userToUpdate);
    } else if (userToUpdate instanceof Teacher) {
      return this.teacherRepository.save(userToUpdate);
    } else if (userToUpdate instanceof Admin) {
      return this.adminRepository.save(userToUpdate);
    }
  }
}
