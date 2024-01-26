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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch()
  public update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.update(id, user);
  }

  @Delete()
  public remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
