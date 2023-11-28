import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}
  create(createEnrollmentDto: CreateEnrollmentDto) {
    return 'This action adds a new enrollment';
  }

  findAll() {
    return this.enrollmentRepository.find();
  }

  findOne(id: string) {
    return this.enrollmentRepository.findOne({ where: { id: id } });
  }

  update(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: string) {
    return this.enrollmentRepository.delete(id);
  }
}
