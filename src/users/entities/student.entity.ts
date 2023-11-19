import { Course } from "src/courses/entities/course.entity";
import { User } from "./user.entity";
import { Task } from "src/tasks/entities/task.entity";

export class Student extends User{
   enrollmentNumber: string;
   courses: Array<Course>;
   tasks: Array<Task>;
}