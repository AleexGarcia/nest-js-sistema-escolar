import { Module, forwardRef } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';


@Module({
  imports: [TypeOrmModule.forFeature([Student]),
  forwardRef(() => EnrollmentsModule),
  forwardRef(() => TasksModule),
],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports:[StudentsService]
})
export class StudentsModule {}
