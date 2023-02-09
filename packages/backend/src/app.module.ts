import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './module/common/common.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [AppController]
})
export class AppModule {}
