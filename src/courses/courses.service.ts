import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
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
    return await this.courseRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: string) {
    return await this.courseRepository.delete(id);
  }

  async findAllStudentsInCourse(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id: id },
      relations: ['enrollments', 'enrollments.student'],
    });
    if(!course) throw new NotFoundException('course not found');
    return course.enrollments;
  }

  async findAllQuizzesInCourse(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id: id },
      relations: ['quizzes'],
    });
    if(!course) throw new NotFoundException('course not found');
    return course.quizzes;
  }

  async removeAllCoursesByUser(teacher: Teacher) {
    return await this.courseRepository.delete({ teacher: teacher });
  }
}
