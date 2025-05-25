import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VoteService } from './vote.service';
import { Vote } from './entities/vote.entity';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Vote)
  votePoll(
    @Args('createVoteInput') input: CreateVoteInput,
    @CurrentUser() user: any
  ) {
    return this.voteService.createVote(input, user);
  }
}

