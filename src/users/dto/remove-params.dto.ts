import {IsUUID, IsEnum} from 'class-validator'
import { UserRole } from '../enum/user-roles.enum';

export class RemoveParams {
    @IsUUID('all')
    id: string;
    
    @IsEnum(UserRole)
    role: UserRole;
}