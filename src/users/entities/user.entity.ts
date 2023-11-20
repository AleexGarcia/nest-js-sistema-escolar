import { Column, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

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
    role: string;
    constructor(email: string, password: string, role: string){
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
