import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsRepository } from './repositories/posts.repository';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { title, content } = createPostDto;
    const newPost = await this.postsRepository.create({ title, content, user });
    return this.postsRepository.save(newPost);
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
