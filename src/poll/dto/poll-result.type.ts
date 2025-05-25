import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class PollResultType {
  @Field()
  option: string;

  @Field(() => Int)
  votes: number;

  @Field(() => Float)
  percentage: number;
}
