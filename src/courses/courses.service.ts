import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/users/entities/teacher.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const { name, code, teacherId } = createCourseDto;
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
    });
    const course = new Course(name,code,teacher);
    return this.courseRepository.save(course);
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
