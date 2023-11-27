import { Module, forwardRef } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { CoursesModule } from 'src/courses/courses.module';


@Module({
  imports: [TypeOrmModule.forFeature([Student]),forwardRef(() => CoursesModule)],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports:[StudentsService]
})
export class StudentsModule {}
