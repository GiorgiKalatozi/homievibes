import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  async create(createPostDto: CreatePostDto): Promise<CreatePostDto> {
    return this.postsRepository.create(createPostDto);
  }

  findAll() {
    return this.postsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
