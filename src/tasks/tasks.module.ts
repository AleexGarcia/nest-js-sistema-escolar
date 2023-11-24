import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/users/entities/student.entity';
import { Task } from './entities/task.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student,Task,Quiz])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
