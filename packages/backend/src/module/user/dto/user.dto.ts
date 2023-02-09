import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test12345' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'test' })
  @IsString()
  username: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test12345' })
  @IsString()
  password: string;
}
