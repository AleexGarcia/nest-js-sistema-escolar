import { Course } from "src/courses/entities/course.entity";
import { User } from "./user.entity";
import {  Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Teacher{
    @Column(() => User)
    user: User;
    @OneToMany(type => Course, course => course.teacher)
    assignedCourses: Array<Course>;
    
}