import { Course } from "src/courses/entities/course.entity";
import { Question } from "src/questions/entities/question.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @OneToMany(type => Question, question => question.quiz)
    questions: Array<Question>;

    course: Course;
    task: Task;
}
