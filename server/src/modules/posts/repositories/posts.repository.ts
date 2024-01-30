import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async create(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<Post> {
    const { title, content } = createPostDto;

    // Retrieve user entity from the database based on the provided user's ID
    const existingUser = await this.usersRepository.findOne(userId);
    if (!existingUser) {
      // Handle case where user does not exist
      throw new NotFoundException(`User with ID ${existingUser.id} not found`);
    }

    const newPost = this.postsRepository.create({
      title,
      content,
      user: existingUser,
    });
    console.log('posts repository', { createPostDto });

    return this.postsRepository.save(newPost);
  }

  public findAll(): Promise<Post[]> {
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
