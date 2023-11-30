import { Module, forwardRef } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    forwardRef(() => QuizzesModule),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService,{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  exports: [QuestionsService],
})
export class QuestionsModule {}
