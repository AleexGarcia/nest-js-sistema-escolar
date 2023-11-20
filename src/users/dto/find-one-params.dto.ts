import {IsUUID, IsEnum} from 'class-validator'
import { UserRole } from '../enum/user-roles.enum';

export class FindOneParams {
    @IsUUID('all')
    id: string;
    
    @IsEnum(UserRole)
    role: UserRole;
}