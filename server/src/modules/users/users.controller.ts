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
  public async create(user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  @Get()
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Patch()
  public async update(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User> {
    return await this.update(id, user);
  }

  @Delete()
  public async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
