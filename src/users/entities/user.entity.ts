import { Column, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

export abstract class User {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    name: string
    @Column()
    email: string
    @Column()
    password: string
    @Column()
    role: 'student' | 'teacher' | 'admin';
}
