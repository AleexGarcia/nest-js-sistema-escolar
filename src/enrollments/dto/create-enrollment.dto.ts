import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateEnrollmentDto {
    @IsUUID()
    @IsNotEmpty()
    courseId: string
    @IsUUID()
    @IsNotEmpty()
    studentId: string
}
