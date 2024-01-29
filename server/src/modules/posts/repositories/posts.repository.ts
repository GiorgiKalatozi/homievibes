import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(post: Post): Promise<Post> {
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  public async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  public async findOne(id: number): Promise<Post> {
    return await this.postsRepository.findOne({ where: { id } });
  }

  public async update(id: number, post: Post): Promise<Post> {
    const postToUpdate = await this.postsRepository.findOne({ where: { id } });
    if (!postToUpdate) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.postsRepository.update(id, post);
    return postToUpdate;
  }
}
