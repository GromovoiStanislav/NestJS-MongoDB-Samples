import { CampersController } from "./campers.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { CamperSchema } from "./db/camper.schema";
import { CamperEntityRepository } from "./db/camper-entity.repository";
import { CamperSchemaFactory } from "./db/camper-schema.factory";
import { CamperFactory } from "./camper.factory";
import { CamperCommandHandlers } from "./commands";
import { CamperEventHandlers } from "./events";
import { CamperQueryHandlers } from "./queries";
import { CamperDtoRepository } from "./db/camper-dto.repository";
import { CamperSagas } from "./sagas/camper.sagas";


@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: CamperSchema.name,
        schema: SchemaFactory.createForClass(CamperSchema),
      },
    ]),
  ],
  controllers: [CampersController],
  providers: [
    CamperEntityRepository,
    CamperDtoRepository,
    CamperSchemaFactory,
    CamperFactory,
    ...CamperCommandHandlers,
    ...CamperEventHandlers,
    ...CamperQueryHandlers,
	CamperSagas,
  ]
})
export class CampersModule {}