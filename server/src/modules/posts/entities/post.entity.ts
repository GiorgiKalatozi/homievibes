import { User } from 'src/modules/user/entities/user.entity';

export class Post {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}
