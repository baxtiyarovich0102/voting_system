import { CreatePollInput } from './create-poll.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePollInput {
  @Field({ nullable: true })
  question?: string;

  @Field(() => [String], { nullable: true })
  options?: string[];

   @Field(() => Boolean, { nullable: true }) 
  isActive?: boolean;
}
