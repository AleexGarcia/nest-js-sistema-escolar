import { IsEmail, IsEnum, IsNotEmpty } from "class-validator"
import { UserRole } from "../enum/user-roles.enum"

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
    
    @IsEnum(UserRole)
    role: UserRole;
}
