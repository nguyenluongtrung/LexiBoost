import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repo';

@Module({
  controllers: [AuthController, AuthRepository],
  providers: [AuthService],
})
export class AuthModule {}
