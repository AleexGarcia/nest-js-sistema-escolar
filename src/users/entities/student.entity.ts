import { Course } from 'src/courses/entities/course.entity';
import { User } from './user.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Student {
  @Column(() => User)
  user: User;

  @Column()
  enrollmentNumber: string;

  @ManyToMany((type) => Course, (course) => course.students)
  courses: Array<Course>;

  @OneToMany((type) => Task, (task) => task.student)
  tasks: Array<Task>;
}
