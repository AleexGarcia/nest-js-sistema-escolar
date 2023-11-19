import { Quiz } from "src/quizzes/entities/quiz.entity"
import { Student } from "src/users/entities/student.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @OneToOne(() => Quiz)
    quiz: Quiz
    @Column({default: false})
    status: boolean;
    @ManyToOne(type=> Student , (student) => student.tasks)
    student: Student;
}
