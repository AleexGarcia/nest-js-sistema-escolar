import { IsDate, IsDateString, IsNotEmpty, IsString, IsUUID, isDate } from "class-validator"

export class CreateQuizDto {
    @IsNotEmpty()
    @IsUUID()
    course_id: string

    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsDateString()
    deadlineDate: string;
}
