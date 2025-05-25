import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { Poll } from 'src/poll/entities/poll.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateVoteInput } from './dto/create-vote.input';

@Injectable()
export class VoteService {
  pollService: any;
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepo: Repository<Vote>,

    @InjectRepository(Poll)
    private readonly pollRepo: Repository<Poll>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createVote(input: CreateVoteInput, currentUser: any): Promise<Vote> {
    const user = await this.userRepo.findOne({
      where: { id: currentUser.id },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const poll = await this.pollRepo.findOne({
      where: { id: input.pollId },
    });

    if (!poll || !poll.isActive) {
      throw new NotFoundException('Poll not found or inactive');
    }

    if (!poll.options.includes(input.selectedOption)) {
      throw new BadRequestException('Invalid option selected');
    }

    const existingVote = await this.voteRepo.findOne({
      where: {
        user: { id: user.id },
        poll: { id: poll.id },
      },
    });

    if (existingVote) {
      throw new ConflictException('User has already voted on this poll');
    }

    const vote = this.voteRepo.create({
      user,
      poll,
      selectedOption: input.selectedOption,
    });

    await this.pollService.clearPollResultsCache(input.pollId);

    return await this.voteRepo.save(vote);
  }
}
