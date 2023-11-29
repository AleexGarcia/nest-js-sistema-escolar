import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(3)
    code: string
    
    @IsUUID()
    @IsNotEmpty()
    teacherId: string;
}
