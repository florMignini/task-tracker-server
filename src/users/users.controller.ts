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
import { CreateUserDto, UpdateUserDto, UserProjectDto } from './dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* 
  public
  register user method
  */
  @Public()
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  /* 
  get all users method
  */
  @Get('get-all')
  public async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  /*  
  get single user by id method
  */
  @Get(':id')
  public async getSingleUserById(@Param('id') id: string) {
    return await this.usersService.getSingleUserById(id);
  }

  @Post('project-to-owner')
  public async isProjectOwner(@Body() userProject: UserProjectDto) {
    return await this.usersService.relateToProject(userProject);
  }

  /*  
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
  delete user method
  */
  @Delete('delete-user/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
