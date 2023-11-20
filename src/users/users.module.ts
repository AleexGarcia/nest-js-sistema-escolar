import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Student } from './entities/student.entity';
import { Admin } from './entities/admin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Teacher,Student,Admin])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
