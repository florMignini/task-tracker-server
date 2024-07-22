import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto, CreateUserDto } from './dto';
import { ErrorHandler } from 'utils/error-handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  public async createUser(newUser: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorHandler({
          type: 'NOT_FOUND',
          message: 'No users found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorHandler.createCustomError(error.message);
    }
  }

  public async getSingleUserById(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
      if (!user) {
        throw new ErrorHandler({
          type: 'NOT_FOUND',
          message: `User with id ${id} was not found`,
        });
      }
      return user;
    } catch (error) {
      throw ErrorHandler.createCustomError(error.message);
    }
  }
  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const user = await this.userRepository.update(id, updateUserDto);
      if (user.affected === 0) {
        throw new ErrorHandler({
          type: 'BAD_REQUEST',
          message: `update could not be completed`,
        });
      }
      return user;
    } catch (error) {
      throw ErrorHandler.createCustomError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user = await this.userRepository.delete(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw ErrorHandler.createCustomError(error.message);
    }
  }
}
