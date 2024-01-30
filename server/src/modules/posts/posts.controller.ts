import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { User } from '../users/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';
import { createPostSchema } from './schemas/create-post.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createPostSchema))
  @HttpCode(HttpStatus.CREATED)
  public create(
    @Body() createPostDto: CreatePostDto,
    @GetCurrentUserId() userId: string,
  ): Promise<PostEntity> {
    console.log({ createPostDto });
    // console.log({ user });

    return this.postsService.create(createPostDto, userId);
  }

  @Get('/user')
  public getUser(@GetCurrentUserId() user: User): User {
    return user;
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
