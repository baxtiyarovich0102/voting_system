import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Poll } from 'src/poll/entities/poll.entity';

@ObjectType()
@Entity()
export class Vote {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, user => user.votes, { eager: true })
  user: User;

  @ManyToOne(() => Poll, poll => poll.votes, { eager: true, onDelete: "CASCADE" })
  poll: Poll;

  @Field()
  @Column()
  selectedOption: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
