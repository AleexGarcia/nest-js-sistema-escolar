import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsUUID()
    quizId: string
    @IsNotEmpty()
    @IsUUID()
    studentId: string;
}
