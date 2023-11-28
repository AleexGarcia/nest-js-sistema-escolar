import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Admin])],
  controllers: [],
  providers: [AdminsService],
  exports:[AdminsService]
})
export class AdminsModule {}
