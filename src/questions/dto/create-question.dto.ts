import { IsNotEmpty, IsArray, IsUUID, IsString } from "class-validator"

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    statement: string

    @IsNotEmpty()
    @IsArray()
    options: string[]
    
    @IsUUID()
    @IsNotEmpty()
    quiz_id: string
}
