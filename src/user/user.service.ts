import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async user(UserWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: UserWhereUniqueInput
        })
    }

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data })
    }

    async updateUser(params: { where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput }): Promise<User> {
        const { where, data } = params
        return this.prisma.user.update({ where, data })
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({ where })
    }
}
