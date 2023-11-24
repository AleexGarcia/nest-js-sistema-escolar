import { Course } from 'src/courses/entities/course.entity';
import { User } from './user.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { ChildEntity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@ChildEntity()
export class Student extends User {
  @ManyToMany((type) => Course, (course) => course.students,{eager: true})
  @JoinTable({name: "course_enrollment"})
  courses: Course[];

  @OneToMany((type) => Task, (task) => task.student,{eager: true})
  tasks: Task[];

  constructor(email: string, password: string) {
    super(email, password);
  }
}
