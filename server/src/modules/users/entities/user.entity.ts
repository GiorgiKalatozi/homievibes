import { Role } from 'src/common/enums';

export class User {
  id: number;
  users: Role[];
  isAdmin: boolean;
}
