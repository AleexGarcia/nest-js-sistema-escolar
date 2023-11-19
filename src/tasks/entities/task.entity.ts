import { Quiz } from "src/quizzes/entities/quiz.entity"
import { Student } from "src/users/entities/student.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @OneToOne(() => Quiz)
    quiz: Quiz
    @Column({default: false})
    status: boolean;
    @OneToOne(() => Student)
    student: Student;
}
