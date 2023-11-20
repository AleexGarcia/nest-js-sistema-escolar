import { IsEnum } from "class-validator";
import { UserRole } from "../enum/user-roles.enum";

export class findAllByRoleParam{
    @IsEnum(UserRole)
    role: UserRole;
}