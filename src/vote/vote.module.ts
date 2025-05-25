import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { VoteService } from './vote.service';
import { VoteResolver } from './vote.resolver';
import { Poll } from 'src/poll/entities/poll.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Poll, User])],
  providers: [VoteService, VoteResolver],
})
export class VoteModule {}