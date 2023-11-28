import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => UsersModule),
    forwardRef(() => QuizzesModule),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports:[TasksService]
})
export class TasksModule {}
