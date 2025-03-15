import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async signupUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return this.userService.createUser(userData)
  }

  @Get()
  async getAll() {
    return this.userService.getAll()
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.user({ id: +id })
  }

  @Patch(':id')
  async updateUser(@Body() userData: Prisma.UserUpdateInput, @Param('id') id: string): Promise<User> {
    return this.userService.updateUser({
      where: { id: +id },
      data: userData
    })
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: +id })
  }

}
