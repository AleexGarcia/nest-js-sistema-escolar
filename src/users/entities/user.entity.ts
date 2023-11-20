import { Column, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { UserRole } from "../enum/user-roles.enum";

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({nullable: true})
    name: string
    @Column({unique: true})
    email: string
    @Column()
    password: string
    @Column()
    role: UserRole;
    constructor(email: string, password: string, role: UserRole){
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
