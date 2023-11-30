import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsOptional()
  @IsString()
  statement?: string;

  @IsOptional()
  @IsNotEmpty()
  options?: string[];
}
