import { Student } from "src/users/entities/student.entity";
import { Teacher } from "src/users/entities/teacher.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    code: string;
    @ManyToOne(type => Teacher, teacher => teacher.assignedCourses)
    teacher: Teacher;
    students: Array<Student>;

}
