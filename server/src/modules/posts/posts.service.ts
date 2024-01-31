import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  async create(createPostDto: CreatePostDto, user: IUser) {
    console.log(user);
    const newPost = this.postsRepository.create({
      ...createPostDto,
      user: { id: user.sub, sub: user.sub },
    });

    return this.postsRepository.save(newPost);
  }

  findAll() {
    return this.postsRepository.findAll();
  }

  findOne(id: string) {
    return this.postsRepository.findOne(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
