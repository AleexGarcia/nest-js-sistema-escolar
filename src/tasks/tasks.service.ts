import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { StudentsService } from 'src/users/students/students.service';
import { Student } from 'src/users/students/entities/student.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentService: StudentsService,
    @Inject(forwardRef(() => QuizzesService))
    private readonly quizService: QuizzesService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const { quizId, studentId } = createTaskDto;
      const [quiz, student] = await Promise.all([
        this.quizService.findOne(quizId),
        this.studentService.findOne(studentId),
      ]);
      if (quiz && student) {
        const task = new Task(quiz, student);
        return this.taskRepository.save(task);
      } else {
        throw new NotFoundException('Task or Student not found');
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'The combination of quiz and student already exists.',
        );
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: string) {
    try {
      const task = await this.taskRepository.findOneOrFail({
        where: { id: id },
      });
      return task;
    } catch (error: any) {
      throw new NotFoundException('Task not found');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const { status } = updateTaskDto;
      const task = await this.findOne(id);
      task.status = status;
      return await this.taskRepository.save(task);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  async remove(id: string) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('task not found');
    return result;
  }

  async removeAllTasksByUser(student: Student) {
    const result = await this.taskRepository.delete({
      student: { id: student.id },
    });
    if (result.affected === 0) throw new NotFoundException('task not found');
    return result;
  }
}
