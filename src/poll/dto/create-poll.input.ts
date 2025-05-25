import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePollInput {
  @Field(() => String,{ description: 'Poll question' })
  question: string
  @Field(() => [String],{ description: 'Poll options' })
  options: string[] 

}
