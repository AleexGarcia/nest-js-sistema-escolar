import { IsNotEmpty, IsUUID } from "class-validator"

export class EnrollStudentDTO {
    @IsUUID()
    @IsNotEmpty()
    courseId: string
    @IsUUID()
    @IsNotEmpty()
    studentId: string
}