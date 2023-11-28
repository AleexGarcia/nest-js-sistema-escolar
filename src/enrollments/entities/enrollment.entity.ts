import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/users/students/entities/student.entity';
import { EnrollStatus } from '../enum/status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Enrollment {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Student, (student) => student.enrollments)
  student: Student;
 
  @ManyToOne(type => Course, (course) => course.enrollments)
  course: Course;

  @Column({ default: EnrollStatus.ACTIVE })
  status: EnrollStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrollmentDate: Date;

  constructor(student: Student, course: Course) {
    this.student = student;
    this.course = course;
  }

}
