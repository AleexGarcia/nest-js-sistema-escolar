import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
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

  async findAll() {
    return await this.quizRepository.find();
  }

  async findOne(id: string) {
    try {
      const quiz = await this.quizRepository.findOneOrFail({
        where: { id: id },
        relations: ['questions'],
      });
      return quiz;
    } catch (error) {
      throw new NotFoundException('quiz not found');
    }
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    try {
      const quiz = await this.findOne(id);
      for (const [key, value] of Object.entries(updateQuizDto)) {
        if (value !== undefined) {
          quiz[key] = value;
        }
      }
      return await this.quizRepository.save(quiz);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update course.');
    }
  }

  async remove(id: string) {
    const result = await this.quizRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('quiz not found');
    return result;
  }
}
