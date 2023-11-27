import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { Teacher } from 'src/users/teachers/entities/teacher.entity';
import { Student } from 'src/users/students/entities/student.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne((type) => Teacher, (teacher) => teacher.assignedCourses)
  teacher: Teacher;

  @OneToMany((type) => Quiz, (quiz) => quiz.course,{eager: true})
  quizzes: Array<Quiz>;

  @ManyToMany((type) => Student, (student) => student.courses)
  students: Array<Student>;

  constructor(name: string, code: string, teacher: Teacher){
    this.name = name;
    this.code = code;
    this.teacher = teacher;
  }
}
