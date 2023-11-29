import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { UserRole } from "../enum/user-roles.enum"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
}
