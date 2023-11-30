import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsOptional()
  @IsUUID()
  teacherId?: string;
  @IsOptional()
  @IsString()
  code?: string;
  @IsOptional()
  @IsString()
  name?: string;
}
