import { PartialType } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.dto';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @IsOptional()
  @IsUUID()
  course_id?: string;

  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  deadlineDate?: string;
}
