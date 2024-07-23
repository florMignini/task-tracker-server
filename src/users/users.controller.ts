import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* 
  public
  register user method
  */
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  /* 
  public
  get all users method
  */
  @Get('get-all')
  public async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  /* 
  public 
  get single user by id method
  */
  @Get(':id')
  public async getSingleUserById(@Param('id') id: string) {
    return await this.usersService.getSingleUserById(id);
  }
}
