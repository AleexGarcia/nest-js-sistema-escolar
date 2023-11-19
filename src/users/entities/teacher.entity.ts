import { Course } from "src/courses/entities/course.entity";
import { User } from "./user.entity";

export class Teacher extends User{
    assignedCourses: Array<Course>;
    
}