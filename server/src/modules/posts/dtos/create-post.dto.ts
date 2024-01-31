import { IUser } from 'src/common/interfaces/user.interface';

export class CreatePostDto {
  title: string;
  content: string;
  user: IUser;
}
