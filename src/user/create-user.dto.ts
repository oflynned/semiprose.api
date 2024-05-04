import { z } from 'zod';
import { UserEntity } from '../entity';

export class CreateUserDto {
  username: UserEntity['username'];
}

export const createUserSchema = z.object({
  email: z.string().email(),
  authenticationMethod: z.string(),
  firebaseId: z.string(),
  username: z.string(),
});
