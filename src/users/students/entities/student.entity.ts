import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { ChildEntity, OneToMany } from 'typeorm';

@ChildEntity()
export class Student extends User {
  @OneToMany((type) => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany((type) => Task, (task) => task.student)
  tasks: Task[];

  constructor(email: string, password: string) {
    super(email, password);
  }
}
