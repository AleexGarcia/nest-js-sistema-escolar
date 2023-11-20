import { Entity, Column } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Admin {
  @Column(() => User)
  user: User;

 
}
