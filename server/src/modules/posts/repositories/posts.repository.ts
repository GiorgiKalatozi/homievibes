import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(user: Post): Promise<Post> {
    const newUser = this.postsRepository.create(user);
    return await this.postsRepository.save(newUser);
  }

  public async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  public async findOne(id: number): Promise<Post> {
    return await this.postsRepository.findOne({ where: { id } });
  }
}
