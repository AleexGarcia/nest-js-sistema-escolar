import { Course } from "src/courses/entities/course.entity";
import { User } from "./user.entity";
import { ChildEntity, OneToMany } from "typeorm";

@ChildEntity()
export class Teacher extends User{

    @OneToMany(type => Course, course => course.teacher,{eager: true})
    assignedCourses: Array<Course>;
    constructor(email:string, password: string){
        super(email,password)
    }
}