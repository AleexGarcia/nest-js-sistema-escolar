import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksService } from 'src/tasks/tasks.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @Inject(forwardRef(() => EnrollmentsService))
    private readonly enrollmentService: EnrollmentsService,
    @Inject(forwardRef(() => TasksService))
    private readonly taskService: TasksService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { email, password } = createStudentDto;
    return this.studentRepository.save(new Student(email, password));
  }

  async findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: string) {
    return this.studentRepository.findOne({ where: { id: id } });
  }

  async update(updateUserDto: UpdateUserDto) {
    const { email, password, name } = updateUserDto;
    const student = new Student(email, password);
    if (name) student.name = name;
    return await this.studentRepository.save(student);
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOne({
      where: {
        id: id,
      },
      relations: ['enrollments', 'tasks'],
    });

    if (!student) throw new NotFoundException('Student not found');

    await Promise.all([
      this.enrollmentService.removeAllEnrollmentByUser(student),
      this.taskService.removeAllTasksByUser(student),
    ]);

    return await this.studentRepository.delete(id);
  }

  async findAllCoursesEnrolled(id: string) {
    const student = await this.studentRepository.findOne({
      where: { id: id },
      relations: ['enrollments', 'enrollments.course'],
    });

    if (!student) throw new NotFoundException('student not found');
    return student.enrollments;
  }

  async findAllTasks(id: string) {
    const student = await this.studentRepository.findOneOrFail({
      where: { id: id },
      relations: ['tasks', 'tasks.quiz'],
    });

    if (!student) throw new NotFoundException('student not found');
    return student.tasks;
  }
}
