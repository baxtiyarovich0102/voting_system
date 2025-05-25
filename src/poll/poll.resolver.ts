import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PollService } from './poll.service';
import { Poll } from './entities/poll.entity';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Resolver(() => Poll)
export class PollResolver {
  constructor(private readonly pollService: PollService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Poll)
  createPoll(
    @Args('createPollInput') createPollInput: CreatePollInput,
    @CurrentUser() user: any
  ) {
    return this.pollService.create(createPollInput, user);
  }

  @Query(() => [Poll], { name: 'polls' })
  @UseGuards(GqlAuthGuard)
  findAll(@CurrentUser() user: any) {
    return this.pollService.findActives(user);
  }

  @Query(() => Poll, { name: 'poll' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pollService.findOne(id);
  }

   @Mutation(() => Poll, {name: "updatePoll"})
  @UseGuards(GqlAuthGuard)
   updatePoll(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePollInput') updatePollInput: UpdatePollInput,
    @CurrentUser() current_user: any,
  ) {
    return this.pollService.update(id, updatePollInput, current_user);
  }

  @Mutation(() => Poll)
  @UseGuards(GqlAuthGuard)
  removePoll(@Args('id', { type: () => Int }) id: number, @CurrentUser() user:any) {
    return this.pollService.remove(id, user);
  }
}
