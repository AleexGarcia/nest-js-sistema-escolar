import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonGetIdDto } from 'src/shared/dto/common-get-id.dto';
import { CheckPolicies } from 'src/shared/decorators/checkpolicies/checkpolicies.decorator';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Actions } from 'src/casl/enum/action.enum';
import { User } from './entities/user.entity';
import { Public } from 'src/shared/decorators/public/public.decorator';

@ApiTags('users')
@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}
 
  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiBearerAuth()
  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, User))
  @ApiOperation({ summary: 'Get a list of all users.' })
  findAll() {
    return this.usersService.findAll();
  }
  @ApiBearerAuth()
  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, User))
  @ApiOperation({ summary: 'Get details of a specific user by ID.' })
  findOne(@Param() params: CommonGetIdDto) {
    const { id } = params;
    return this.usersService.findOne(id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Update, User))
  @ApiOperation({ summary: 'Update details of a specific user by ID.' })
  update(
    @Param() params: CommonGetIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { id } = params;
    return this.usersService.update(id, updateUserDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Delete, User))
  @ApiOperation({ summary: 'Delete a specific user by ID.' })
  remove(@Param() params: CommonGetIdDto) {
    const { id } = params;
    return this.usersService.remove(id);
  }
}
