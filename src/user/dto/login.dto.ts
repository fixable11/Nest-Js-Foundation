import {
  IsNotEmpty,
  IsEmail,
  ValidateNested,
  IsObject,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
