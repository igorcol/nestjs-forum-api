import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    @Inject()
    private readonly userService: UserService;


    async signIn(params: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
        const user = await this.userService.user({ email: params.email })
        if (!user) throw new Error(`User not found`)

        const passwordMatch = bcrypt.compare(params.password, user.password)
        if (!passwordMatch) throw new UnauthorizedException(`Invalid credentials`)

        const { password, ...result } = user;
        return result
    }



}
