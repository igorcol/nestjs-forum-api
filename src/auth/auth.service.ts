import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    @Inject()
    private readonly userService: UserService;
    @Inject()
    private readonly jwtService: JwtService;

    async signIn(params: Prisma.UserCreateInput): Promise<{ access_token: string }> {
        const user = await this.userService.user({ email: params.email })
        if (!user) throw new Error(`User not found`)

        const passwordMatch = await bcrypt.compare(params.password, user.password)
        if (!passwordMatch) throw new UnauthorizedException(`Invalid credentials`)

        const payload = { sub: user.id }
        const access_token = await this.jwtService.signAsync(payload)

        return { access_token: access_token }
    }



}
