import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    const {email,password} = createAdminDto;
    return this.adminRepository.save(new Admin(email, password));
  }

  findAll() {
    return this.adminRepository.find();
  }

  findOne(id: string) {
    return this.adminRepository.findOne({ where: { id: id } });
  }

  async update(updateUserDto: UpdateUserDto) {
    const { email, password, name } = updateUserDto;
    const admin = new Admin(email, password);
    if (name) admin.name = name;
    return await this.adminRepository.save(admin);
  }

  remove(id: string) {
    return this.adminRepository.delete(id);
  }
}
