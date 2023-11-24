import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    try {
      const { course_id, name, description, deadlineDate } = createQuizDto;
      const course = await this.courseRepository.findOne({
        where: { id: course_id },
      });
      if (course) {
        const parsedDeadlineDate  = new Date(deadlineDate);
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
    return `This action returns all quizzes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
