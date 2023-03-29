import { Module } from '@nestjs/common';
//import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
	ConfigModule.forRoot({ isGlobal: true }),
    //MongooseModule.forRoot("mongodb://localhost/demo"),
    DatabaseModule,
	UsersModule
  ],
})
export class AppModule {}
