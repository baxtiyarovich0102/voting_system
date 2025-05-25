import { RegisterInput } from './register.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(RegisterInput) {
  @Field(() => Int)
  id: number;
}
