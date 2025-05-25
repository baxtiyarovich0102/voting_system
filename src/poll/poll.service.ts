import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Injectable()
export class PollService {

  constructor(@InjectRepository(Poll) private pollRepo: Repository<Poll>, @InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async create(createPollInput: CreatePollInput, currentUser:any): Promise<Poll> {

    const user = await this.userRepo.findOne({
      where: { id: currentUser.id },
    });
    
    if (!user || user.role !== 'ADMIN')
      throw new UnauthorizedException('Only admins can create polls');
    
    const poll = this.pollRepo.create({
      ...createPollInput,
      createdBy: user,
    })
    return await this.pollRepo.save(poll)
  }

  async findActives(user:any): Promise<Poll[]> {
    if (!user || user.role !== 'ADMIN')
      throw new UnauthorizedException('Only admins can see active polls');

    return await this.pollRepo.find({where: { isActive: true }});
  }

  async findOne(id: number): Promise<Poll> {
    const poll = await this.pollRepo.findOne({where:{id, isActive: true}})
     if (!poll) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return poll;
  }

  async update(id: number, updatePollInput: UpdatePollInput, user:any): Promise<Poll> {
    if (!user || user.role !== 'ADMIN')
      throw new UnauthorizedException('Only admins can change polls');
    const poll = await this.pollRepo.findOneBy({id})
    if (!poll) {
      throw new NotFoundException(`Poll with id ${id} not found`);
    }
    
  Object.assign(poll, updatePollInput);
    return this.pollRepo.save(poll);
  }

  async remove(id: number, user: any): Promise<Poll> {
    if (!user || user.role !== 'ADMIN')
      throw new UnauthorizedException('Only admins can delete books');
    const poll = await this.findOne(id);
    return this.pollRepo.remove(poll);
  }



async getPollResults(pollId: number, user: any) {
  if (!user || user.role !== 'ADMIN')
    throw new UnauthorizedException('Only admins can see results');

  const poll = await this.pollRepo.findOne({
    where: { id: pollId },
    relations: ['votes'],
  });

  if (!poll) throw new NotFoundException('Poll not found');

  const totalVotes = poll.votes.length;

  const result = poll.options.map((option) => {
    const votesCount = poll.votes.filter((v) => v.selectedOption === option).length;
    const percentage = totalVotes === 0 ? 0 : +( (votesCount / totalVotes) * 100 ).toFixed(1);
    return {
      option,
      votes: votesCount,
      percentage,
    };
  });

  return result;
}




}
