import { Inject, Injectable, forwardRef } from '@nestjs/common';
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
    const { quizId, studentId } = createTaskDto;
    const [quiz, student] = await Promise.all([
      this.quizService.findOne(quizId),
      this.studentService.findOne(studentId),
    ]);
    if (quiz && student) {
      const task = new Task(quiz, student);
      return this.taskRepository.save(task);
    } else {
      throw new Error('Invalid Id');
    }
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: string) {
    return await this.taskRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: string) {
    return this.taskRepository.delete(id);
  }

  async removeAllTasksByUser(student: Student) {
    return await this.taskRepository.delete({ student: student });
  }
}
