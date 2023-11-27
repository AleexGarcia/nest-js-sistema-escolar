import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { Student } from 'src/users/students/entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student,Task,Quiz])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
