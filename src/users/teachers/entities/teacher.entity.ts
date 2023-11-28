import { Course } from "src/courses/entities/course.entity";
import { User } from "../../entities/user.entity";
import { ChildEntity, OneToMany } from "typeorm";

@ChildEntity()
export class Teacher extends User{

    @OneToMany(type => Course, course => course.teacher)
    assignedCourses: Array<Course>;
    constructor(email:string, password: string){
        super(email,password)
    }
}