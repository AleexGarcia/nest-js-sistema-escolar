import { Course } from 'src/courses/entities/course.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deadlineDate: Date;

  @OneToMany((type) => Question, (question) => question.quiz, { eager: true })
  questions: Array<Question>;

  @ManyToOne((type) => Course, (course) => course.quizzes)
  course: Course;

  @OneToOne(() => Task)
  task: Task;

  constructor(
    name: string,
    description: string,
    deadlineDate: Date,
    course: Course,
  ) {
    this.name = name;
    this.description = description;
    this.course = course;
    this.deadlineDate = deadlineDate;
  }
}
