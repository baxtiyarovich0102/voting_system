import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class LoginInput {

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(4)
  password: string;
}
