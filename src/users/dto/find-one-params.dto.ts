import {IsUUID} from 'class-validator'


export class FindOneParams {
    @IsUUID('all')
    id: string;
    
}