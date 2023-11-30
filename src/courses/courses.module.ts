import { Module, forwardRef } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => UsersModule),
    
  ],
  controllers: [CoursesController],
  providers: [CoursesService,{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  exports: [CoursesService],
})
export class CoursesModule {}
