import { Field, ObjectType } from '@nestjs/graphql';
import { Poll } from 'src/poll/entities/poll.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ type: 'enum', enum: ['ADMIN', 'USER'], default: 'USER' })
  role: 'ADMIN' | 'USER';

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Poll, (poll) => poll.createdBy)
polls: Poll[];
}
