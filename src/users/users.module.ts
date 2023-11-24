import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Teacher } from './entities/teacher.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Teacher])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
