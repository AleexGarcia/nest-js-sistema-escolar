import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @Inject(forwardRef(() => CoursesService))
    private readonly courseService: CoursesService,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    const { email, password } = createTeacherDto;
    return this.teacherRepository.save(new Teacher(email, password));
  }

  findAll() {
    return this.teacherRepository.find();
  }

  findOne(id: string) {
    return this.teacherRepository.findOne({ where: { id: id } });
  }

  async update(updateUserDto: UpdateUserDto) {
    const { email, password, name } = updateUserDto;
    const teacher = new Teacher(email, password);
    if (name) teacher.name = name;
    return await this.teacherRepository.save(teacher);
  }

  async remove(id: string) {
    const teacher = await this.teacherRepository.findOne({
      where: {
        id: id,
      },
      relations: ['assignedCourses'],
    });

    if (!teacher) throw new NotFoundException('teacher not found');

    await this.courseService.removeAllCoursesByUser(teacher);
    
    return await this.teacherRepository.delete(id);
  }
}
