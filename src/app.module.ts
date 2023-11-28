import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { TasksModule } from './tasks/tasks.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { QuestionsModule } from './questions/questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

import { Teacher } from './users/teachers/entities/teacher.entity';
import { Admin } from './users/admins/entities/admin.entity';
import { Task } from './tasks/entities/task.entity';
import { Quiz } from './quizzes/entities/quiz.entity';
import { Course } from './courses/entities/course.entity';
import { Question } from './questions/entities/question.entity';
import { Student } from './users/students/entities/student.entity';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { Enrollment } from './enrollments/entities/enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'db_sistema_escolar',
      entities: [User,Task,Student,Teacher,Admin,Quiz,Course, Question, Enrollment],
      synchronize: true,
    }),
    UsersModule,
    CoursesModule,
    TasksModule,
    QuizzesModule,
    QuestionsModule,
    EnrollmentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
