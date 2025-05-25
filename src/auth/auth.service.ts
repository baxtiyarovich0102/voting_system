import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterInput) {
    const existingUser = await this.userRepository.findOneBy({
      email: input.email,
    });
    if (existingUser) {
      throw new Error('Email allaqachon ro‘yxatdan o‘tgan');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = this.userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: 'USER',
    });
    
    return await this.userRepository.save(user);
  }

  async login(input: LoginInput) {
    const user = await this.userRepository.findOneBy({ email: input.email });

    if (!user) {
      throw new Error('User not found');
    }

    if(user.role != "ADMIN"){
      const isPasswordValid = await bcrypt.compare(input.password, user.password)
      if (!isPasswordValid) throw new Error('Invalid password');}

      if(user.role == "ADMIN"){
        if(user.password != input.password) throw new Error("Invalid password")
      }
    
    const token = this.jwtService.sign({ id: user.id, role: user.role });
    return { token, user };
  }

}
