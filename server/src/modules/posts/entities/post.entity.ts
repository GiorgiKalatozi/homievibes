import { User } from 'src/modules/users/entities/user.entity';

export class Post {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}
