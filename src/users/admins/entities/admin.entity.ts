import { ChildEntity } from 'typeorm';
import { User } from '../../entities/user.entity';

@ChildEntity()
export class Admin extends User{
    constructor(email:string, password: string){
        super(email,password)
    }
 
}
