import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TeachersService } from 'src/users/teachers/teachers.service';
import { Teacher } from 'src/users/teachers/entities/teacher.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @Inject(forwardRef(() => TeachersService))
    private readonly teacherService: TeachersService,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const { name, code, teacherId } = createCourseDto;
    const teacher = await this.teacherService.findOne(teacherId);
    const course = new Course(name, code, teacher);
    return this.courseRepository.save(course);
  }

  async findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({ where: { id: id } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.findOne(id);
      for (const [key, value] of Object.entries(updateCourseDto)) {
        if (value !== undefined) {
          course[key] = value;
        }
      }
      return await this.courseRepository.save(course);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update course.');
    }
  }

  async remove(id: string) {
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Course not found');
    return result;
  }

  async findAllStudentsInCourse(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id: id },
      relations: ['enrollments', 'enrollments.student'],
    });
    if (!course) throw new NotFoundException('course not found');
    return course.enrollments;
  }

  async findAllQuizzesInCourse(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id: id },
      relations: ['quizzes'],
    });
    if (!course) throw new NotFoundException('course not found');
    return course.quizzes;
  }

  async removeAllCoursesByUser(teacher: Teacher) {
    const result = await this.courseRepository.delete({
      teacher: { id: teacher.id },
    });
    if (result.affected === 0) throw new NotFoundException('Course not found');
    return result;
  }
}
