import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Quiz,Course])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
