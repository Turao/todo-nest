import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(), UsersModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
