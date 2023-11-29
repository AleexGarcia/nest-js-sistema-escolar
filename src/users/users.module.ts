import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { AdminsModule } from './admins/admins.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    StudentsModule,
    TeachersModule,
    AdminsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [StudentsModule, TeachersModule, AdminsModule],
})
export class UsersModule {}
