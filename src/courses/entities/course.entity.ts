import { Student } from "src/users/entities/student.entity";
import { Teacher } from "src/users/entities/teacher.entity";

export class Course {
    id: string;
    name: string;
    code: string;
    teacher: Teacher;
    students: Array<Student>;

}
