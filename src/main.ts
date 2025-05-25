import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.use(
    '/graphql',
    rateLimit({
      windowMs: 30_000, 
      max: 10, 
      standardHeaders: true, 
      legacyHeaders: false, 
      message: 'Too many GraphQL requests, please try again later.',
    }),
  );
  await app.listen(process.env.PORT ?? 4444);
}
bootstrap();
