import { Quiz } from "src/quizzes/entities/quiz.entity"
import { Student } from "src/users/entities/student.entity";

export class Task {
    id: string
    quiz: Quiz
    status: boolean = false;
    student: Student;
}
