import { User } from 'src/modules/users/entities/user.entity';

export class CreatePostDto {
  title: string;
  content: string;
  user: User;
}
