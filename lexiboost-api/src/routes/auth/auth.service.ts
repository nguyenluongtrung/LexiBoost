import { Injectable } from '@nestjs/common';

import { InvalidPasswordException } from 'src/shared/error';
import { AccessTokenPayloadCreate } from 'src/shared/types/jwt.type';
import { HashingService } from 'src/shared/services/hashing.service';
import { TokenService } from 'src/shared/services/token.service';

import { LoginBodyType } from './auth.model';
import { EmailNotFoundException } from './auth.error';
import { AuthRepository } from './auth.repo';

@Injectable()
export class AuthService {
  constructor (private readonly hashingService: HashingService,
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async login(body: LoginBodyType){
    // 1. Get user information, check if user is existed, password is correct
    const user = await this.authRepository.findUniqueUserIncludeRole({
      email: body.email
    })
    if(!user){
      throw EmailNotFoundException
    }

    const isPasswordValid = await this.hashingService.compare(body.password, user.password);
    if(!isPasswordValid){
      throw InvalidPasswordException
    }

    // 2. Create new access token and refresh token
    const tokens = await this.generateTokens({
      userId: user.id,
      roleId: user.roleId,
      roleName: user.role.name
    })

    return tokens
  }

  async generateTokens({
    userId,
    roleId,
    roleName
  }: AccessTokenPayloadCreate){
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({
        userId,
        roleId,
        roleName
      }),
      this.tokenService.signRefreshToken({
        userId,
      })
    ])

    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);
    await this.authRepository.createRefreshToken({
      token: refreshToken,
      userId,
      expiresAt: new Date(decodedRefreshToken.exp * 1000),
    })

    return {accessToken, refreshToken}
  }
}
