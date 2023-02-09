import { ApiColumn } from 'src/module/common/decorators';
import { Entity } from 'typeorm';
import { EnhancedBaseModel } from './enhanced-base.model';

@Entity()
export class User extends EnhancedBaseModel {
  @ApiColumn('Represent email of user', { unique: true })
  email: string;

  @ApiColumn('Represent password of user', { nullable: true })
  password?: string;

  @ApiColumn('Represent username of user')
  username: string;
}
