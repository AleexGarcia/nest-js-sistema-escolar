import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { TasksModule } from './tasks/tasks.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [ UsersModule, CoursesModule, TasksModule, QuizzesModule, QuestionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
