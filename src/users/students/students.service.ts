import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EnrollStudentDTO } from './dto/enroll-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CoursesService } from 'src/courses/courses.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @Inject(forwardRef(() => CoursesService))
    private readonly couseService: CoursesService,
  ) {}

  async enrollStudent(enrollStudentDTO: EnrollStudentDTO) {
    const { courseId, studentId } = enrollStudentDTO;
    const [student, course] = await Promise.all([
      this.studentRepository.findOne({ where: { id: studentId } }),
      this.couseService.findOne(courseId),
    ]);
    if (student && course) {
      
    }
  }
  
  create(createAdminDto: CreateStudentDto) {
    return 'This action adds a new admin';
  }

  async findAll() {
    return this.studentRepository.find();
  }

  findOne(id: string) {
    return this.studentRepository.findOne({where:{id: id}});
  }

  update(id: string, updateAdminDto: UpdateStudentDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: string) {
    return this.studentRepository.delete(id);
  }
}
