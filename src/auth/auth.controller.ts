import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signIn(body);
  }
  
}
