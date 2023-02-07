import {
  IsNotEmpty,
  IsEmail,
  ValidateNested,
  IsObject,
  Length,
  IsNotEmptyObject,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(1, 100)
  username: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  bio?: string = null;
  image?: string = null;
}

export class CreateUserDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user: UserDto;
}
