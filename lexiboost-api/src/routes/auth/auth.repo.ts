import { Injectable } from "@nestjs/common";

import { UserType } from "src/shared/models/shared-user.model";
import { PrismaService } from "src/shared/services/prisma.service";
import { RoleType } from "src/shared/models/shared-role.model";

import { RefreshTokenType } from "./auth.model";
import { WhereUniqueUserType } from "src/shared/repositories/shared-user.repo";

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(
    user: Pick<
      UserType,
      "email" | "password" | "roleId" | "name" | "phoneNumber"
    >,
  ): Promise<Omit<UserType, "password">> {
    return this.prismaService.user.create({
      data: user,
      omit: {
        password: true,
      },
    });
  }

  createUserIncludeRole(
    user: Pick<
      UserType,
      "email" | "password" | "roleId" | "name" | "phoneNumber" | "avatar"
    >,
  ): Promise<Omit<UserType, "password"> & { role: RoleType }> {
    return this.prismaService.user.create({
      data: user,
      omit: {
        password: true,
      },
      include: {
        role: true,
      },
    });
  }

  createRefreshToken(data: { token: string; userId: number; expiresAt: Date }) {
    return this.prismaService.refreshToken.create({
      data,
    });
  }

  deleteRefreshToken(where: { token: string }): Promise<RefreshTokenType> {
    return this.prismaService.refreshToken.delete({
      where,
    });
  }

  findUniqueRefreshTokenIncludeUserRole(where: {
    token: string
  }): Promise<(RefreshTokenType & {user: UserType & {role: RoleType}}) | null> {
    return this.prismaService.refreshToken.findUnique({
      where,
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  findUniqueUserIncludeRole(where: WhereUniqueUserType): Promise<(UserType & { role: RoleType }) | null> {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        role: true,
      },
    });
  }
}
