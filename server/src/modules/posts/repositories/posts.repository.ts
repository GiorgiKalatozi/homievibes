import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postsRepository.create(createPostDto);
  }

  public async save(post: Post): Promise<Post> {
    return this.postsRepository.save(post);
  }
  public async findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  public async findOne(id: string): Promise<Post> {
    return await this.postsRepository.findOne({ where: { id } });
  }

  public async update(id: string, post: Post): Promise<Post> {
    const postToUpdate = await this.postsRepository.findOne({ where: { id } });
    if (!postToUpdate) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.postsRepository.update(id, post);
    return postToUpdate;
  }
}
