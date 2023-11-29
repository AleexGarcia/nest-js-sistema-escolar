import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional,IsString } from 'class-validator';
import { UserRole } from '../enum/user-roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    password?: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsString()
    name?: string;
}
