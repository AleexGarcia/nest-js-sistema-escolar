import { ChildEntity } from 'typeorm';
import { User } from './user.entity';

@ChildEntity()
export class Admin extends User{
    constructor(email:string, password: string){
        super(email,password)
    }
 
}
