import { Module, forwardRef } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuizzesModule } from 'src/quizzes/quizzes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    forwardRef(() => QuizzesModule),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
