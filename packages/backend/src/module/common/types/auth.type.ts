import { IsEmail, IsEthereumAddress, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { EAppRoles } from './roles.type';

export class AuthCredentialsDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthWalletDTO {
  @IsEthereumAddress()
  wallet: string;
}

export class GenerateTokenDTO {
  @IsUUID()
  id: string;

  @IsString()
  role: EAppRoles;

  @IsString()
  email?: string;
}
