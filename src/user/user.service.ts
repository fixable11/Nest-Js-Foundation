import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<UserDocument>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this._userModel.create(user);
  }

  async findOne(id: string) {
    return await this._userModel.findOne({ _id: id }).exec();
  }

  async findByEmail(email: string) {
    return await this._userModel.findOne({ email }).exec();
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const model = await this.findOne(id);
    model.overwrite(user);
    await model.save();

    return model;
  }

  async remove(id: string): Promise<User> {
    return await this._userModel.findByIdAndRemove({ _id: id }).exec();
  }
}
