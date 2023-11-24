import {IsUUID} from 'class-validator'


export class RemoveParams {
    @IsUUID('all')
    id: string;
}