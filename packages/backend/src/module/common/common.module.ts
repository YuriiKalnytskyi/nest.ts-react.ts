import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthGuard } from './guards';

function getSSLConfig(env: string) {
  const configs = {
    production: { rejectUnauthorized: true },
    local: false,
    deploy: { rejectUnauthorized: false }
  };
  if (!configs[env] === undefined) {
    throw new Error('Set network in your .env file');
  }
  return configs[env];
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT_DB),
      logging: ['query', 'error'],
      type: 'postgres',
      entities: ['dist/db/models/**/*.model.{ts,js}'],
      migrations: ['dist/db/migrations/**/*.{ts,js}'],
      subscribers: ['src/db/seeders/**/*.ts'],
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      // ssl: getSSLConfig(process.env.SERVER_MODE),
      ssl: false,
      synchronize: true
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
    ScheduleModule.forRoot()
  ],

  providers: [ConfigModule, ConfigService, JWTAuthGuard],
  exports: [JwtModule, TypeOrmModule, ConfigModule, ConfigService, JWTAuthGuard, ConfigService]
})
export class CommonModule {}
