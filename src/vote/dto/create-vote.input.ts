import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
