import { Body } from '@nestjs/common';
import { ApiController, ApiPost } from '../common/decorators';
import { UserService } from './user.service';
import { TokenDTO } from '../common/dtos';
import { EAppRoles } from '../common/types';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';

@ApiController('user')
export class UserController {
  constructor(private userAuthService: UserService) {}

  @ApiPost('register', 'register', TokenDTO)
  async register(@Body() data: CreateUserDto): Promise<TokenDTO> {
    const res = await this.userAuthService.register(data);
    return this.userAuthService.generateToken({
      role: EAppRoles.USER,
      ...res
    });
  }

  @ApiPost('login', 'login', TokenDTO)
  async login(@Body() data: LoginUserDto): Promise<TokenDTO> {
    return await this.userAuthService.login(data);
  }
}
