import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @Inject(forwardRef(() => CoursesService))
    private coursesService: CoursesService,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    try {
      const { course_id, name, description, deadlineDate } = createQuizDto;
      const course = await this.coursesService.findOne(course_id);
      if (course) {
        const parsedDeadlineDate = new Date(deadlineDate);
        const quiz = new Quiz(name, description, parsedDeadlineDate, course);
        return this.quizRepository.save(quiz);
      } else {
        throw new Error('Invalid course Id');
      }
    } catch (err) {
      return err;
    }
  }

  findAll() {
    return this.quizRepository.find();
  }

  async findOne(id: string) {
    return await this.quizRepository.findOne({ where: { id: id }, relations: ['questions'] });
  }

  update(id: string, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: string) {
    return this.quizRepository.delete(id);
  }
}
