import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { EncryptionService } from './encryption/encryption.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
    private _encryptionService: EncryptionService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    data.user.password = await this._encryptionService.hash(data.user.password);

    return await this._userModel.create(data.user);
  }

  async findOne(id: string) {
    return await this._userModel.findOne({ _id: id }).exec();
  }

  async findByEmail(email: string) {
    return await this._userModel.findOne({ email }).exec();
  }

  async updateUser(user: User, dto: UpdateUserDto): Promise<User> {
    if (dto.user.password) {
      dto.user.password = await this._encryptionService.hash(dto.user.password);
    }

    user.overwrite(dto.user);
    await user.save();

    return user;
  }

  async remove(id: string): Promise<User> {
    return await this._userModel.findByIdAndRemove({ _id: id }).exec();
  }
}
