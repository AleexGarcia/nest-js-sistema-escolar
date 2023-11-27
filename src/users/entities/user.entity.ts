import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { UserRole } from "../enum/user-roles.enum";
@Entity()
@TableInheritance({ column: { type: "enum", name: "role" ,enum: UserRole} })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({nullable: true})
    name: string
    @Column({unique: true})
    email: string
    @Column()
    password: string
    @Column({ type: 'enum', enum: UserRole})
    role: UserRole;

    constructor(email:string, password: string){
        this.email = email;
        this.password = password;
    }
}
