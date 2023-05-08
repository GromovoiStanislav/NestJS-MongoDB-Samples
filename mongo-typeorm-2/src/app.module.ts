import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "node:path";
import { ItemModule } from "./item/item.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "test",
      entities: [join(__dirname, "**/**.entity{.ts,.js}")],
      synchronize: true
    }),
    ItemModule]
})
export class AppModule {
}
