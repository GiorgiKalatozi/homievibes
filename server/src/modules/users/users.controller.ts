import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Admin)
  public create(user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch()
  @Roles(Role.Admin)
  public update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.update(id, user);
  }

  @Delete()
  @Roles(Role.Admin)
  public remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
