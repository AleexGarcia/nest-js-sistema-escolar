import { IsNotEmpty, IsString, IsUUID, Max } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @Max(3)
    @IsString()
    @IsNotEmpty()
    code: string
    
    @IsUUID()
    @IsNotEmpty()
    teacherId: string;
}
