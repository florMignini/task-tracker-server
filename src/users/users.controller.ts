import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';

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

  /* 
  public 
  update user method
  */
  @Put('update/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  /* 
  public 
  delete user method
  */
  @Delete('delete-user')
  public async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
