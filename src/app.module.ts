import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PollModule } from './poll/poll.module';
import { VoteModule } from './vote/vote.module';
import Redis from 'ioredis';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // 60 soniya ichida
      limit: 10, // maksimal 10 ta so‘rov
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '931646479q',
      database: 'voting_system',
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    UserModule,
    PollModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: 'localhost', // yoki .env dan
          port: 6379,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class AppModule {}
