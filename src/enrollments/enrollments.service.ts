import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { StudentsService } from 'src/users/students/students.service';
import { Student } from 'src/users/students/entities/student.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @Inject(forwardRef(() => CoursesService))
    private readonly courseService: CoursesService,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentService: StudentsService,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    try {
      const { courseId, studentId } = createEnrollmentDto;
      const [student, course] = await Promise.all([
        this.studentService.findOne(studentId),
        this.courseService.findOne(courseId),
      ]);
      if (student && course) {
        const newEnrollment = new Enrollment(student, course);
        return await this.enrollmentRepository.save(newEnrollment);
      } else {
        throw new NotFoundException('student or course not found');
      }
    } catch (err: any) {
      if (err.code === '23505') {
        throw new ConflictException(
          'The combination of student and course already exists.',
        );
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }

  async findAll() {
    return await this.enrollmentRepository.find();
  }

  async findOne(id: string) {
    try {
      const enrollment = await this.enrollmentRepository.findOneOrFail({
        where: { id: id },
      });
      return enrollment;
    } catch (error: any) {
      throw new NotFoundException('Enrollment not found');
    }
  }

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    try {
      const { status } = updateEnrollmentDto;
      const enrollment = await this.findOne(id);
      enrollment.status = status;
      return await this.enrollmentRepository.save(enrollment);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update enrollment.');
    }
  }

  async remove(id: string) {
    const result = await this.enrollmentRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Enrollment not found');
    return result;
  }

  async removeAllEnrollmentByUser(student: Student) {
    const result = await this.enrollmentRepository.delete({
      student: { id: student.id },
    });
    if (result.affected === 0)
      throw new NotFoundException('Enrollment not found');
    return result;
  }
}
