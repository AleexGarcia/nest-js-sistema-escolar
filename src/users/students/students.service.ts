import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { EnrollStudentDTO } from './dto/enroll-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CoursesService } from 'src/courses/courses.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @Inject(forwardRef(() => CoursesService))
    private readonly courseService: CoursesService,
    @Inject(forwardRef(() => TasksService))
    private readonly taskService: TasksService,
  ) {}

  async enrollStudent(enrollStudentDTO: EnrollStudentDTO) {
    const { courseId, studentId } = enrollStudentDTO;
    const [student, course] = await Promise.all([
      this.studentRepository.findOne({ where: { id: studentId } }),
      this.courseService.findOne(courseId),
    ]);
    if (student && course) {
      if (!student.enrollments) {
        student.enrollments = [];
      } else {
        student.enrollments.push();
      }
      this.studentRepository.save(student);
    }
  }

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

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOne({
      where: {
        id: id,
      },
      relations: ['courses', 'tasks'],
    });

    if (!student) throw new NotFoundException('Student not found');

    // await Promise.all(
    //   student.courses.map((course) => this.courseService.remove(course.id)),
    // );

    await Promise.all(
      student.tasks.map((task) => this.taskService.remove(task.id)),
    );

    return this.studentRepository.delete(id);
  }

  async findAllCoursesEnrolled(id: string) {
    const student = await this.studentRepository.findOneOrFail({
      where: { id: id },
      relations: ['enrollments'],
    });
  }
  async findAllTasks(id: string) {
    const student = await this.studentRepository.findOneOrFail({
      where: { id: id },
      relations: ['enrollments'],
    });
  }
}
