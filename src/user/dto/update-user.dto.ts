import { ValidateNested, IsEmail, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

class UpdatedUser {
  @IsEmail()
  email?: string;

  @MinLength(6)
  password?: string;

  bio?: string = null;
  image?: string = null;
}

export class UpdateUserDto {
  @ValidateNested()
  @Type(() => UpdatedUser)
  user: UpdatedUser;
}
