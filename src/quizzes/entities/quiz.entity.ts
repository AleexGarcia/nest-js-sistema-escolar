import { Course } from "src/courses/entities/course.entity";
import { Question } from "src/questions/entities/question.entity";

export class Quiz {
    id: string;
    questions: Array<Question>;
    course: Course;
}
