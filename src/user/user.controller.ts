import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
  Put,
  Request,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorFilter } from '../filters/ErrorFilter';
import { AuthService } from './auth/auth.service';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt.auth-guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseFilters(ErrorFilter)
  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user: User = await this.userService.create(createUserDto);
    const token = this.authService.createToken(user);

    return {
      user: user.toJson(),
      token,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async authorize(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.user.email);
    const token = this.authService.createToken(user);

    return {
      user: user.toJson(),
      token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  async updateUser(@Request() req, @Body() dto: UpdateUserDto) {
    const user = await this.userService.findByEmail(req.user.email);
    const updatedUser = await this.userService.updateUser(user, dto);

    const token = this.authService.createToken(updatedUser);

    return {
      user: user.toJson(),
      token,
    };
  }
}
