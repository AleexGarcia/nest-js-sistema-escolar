import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}
  
  @ApiOperation({ summary: 'Create a new enrollment' })
  @Post()
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }
  
  @ApiOperation({ summary: 'Get all enrollments' })
  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @ApiOperation({ summary: 'Get details of a specific enrollment by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enrollmentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update details of a specific enrollment by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  @ApiOperation({ summary: 'Delete a specific enrollment by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(id);
  }
}
