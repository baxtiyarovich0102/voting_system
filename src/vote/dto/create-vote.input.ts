import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field()
  pollId: number;

  @Field()
  selectedOption: string;
}