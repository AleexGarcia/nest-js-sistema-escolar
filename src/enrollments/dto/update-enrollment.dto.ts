import { PartialType } from '@nestjs/swagger';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { EnrollStatus } from '../enum/status.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
    @IsNotEmpty()
    @IsEnum(EnrollStatus)
    status: EnrollStatus;
}
