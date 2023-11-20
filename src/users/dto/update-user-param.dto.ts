import { IsUUID} from 'class-validator'

export class UpdateParams {
    @IsUUID('all')
    id: string;

}