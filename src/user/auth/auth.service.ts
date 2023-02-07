import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { EncryptionService } from '../encryption/encryption.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(user: User): string {
    return this.jwtService.sign(user.getClaims());
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findByEmail(email);

    if (
      user &&
      (await this.encryptionService.compare(password, user.getPassword()))
    ) {
      return user;
    }

    return undefined;
  }
}
