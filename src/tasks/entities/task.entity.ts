import { Quiz } from "src/quizzes/entities/quiz.entity"
import { Student } from "src/users/students/entities/student.entity";

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['student','quiz'])
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @OneToOne(() => Quiz)
    @JoinColumn()
    quiz: Quiz
    @Column({default: false})
    status: boolean;
    @ManyToOne(type=> Student , (student) => student.tasks)
    student: Student;
    constructor(quiz: Quiz, student: Student){
        this.quiz = quiz;
        this.student = student;
        this.status = false;
    }
}
