import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Entity('polls')
export class Poll {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  question: string;

  @Field(() => [String])
  @Column('text', { array: true })
  options: string[];

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => User)
  @ManyToOne(() => User, user => user.id, { eager: true, onDelete: 'CASCADE' })
  createdBy: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}