import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCamperRequest } from "./dto/create-camper-request.dto";
import { UpdateCamperAllergiesRequest } from "./dto/update-camper-allergies-request.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCamperCommand } from "./commands/create-camper/create-camper.command";
import { UpdateAllergiesCommand } from "./commands/update-allergies/update-allergies.command";
import { CamperDto } from "./dto/camper.dto";
import { CamperSchema } from "./db/camper.schema";
import { CampersQuery } from "./queries/campers-query/campers.query";
import { CamperQuery } from "./queries/camper-query/camperQuery";

@Controller("campers")
export class CampersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Get(":id")
  async getCamper(@Param("id") camperId: string): Promise<CamperDto> {
    return this.queryBus.execute<CamperQuery, CamperDto>(new CamperQuery(camperId));
  }

  @Get()
  async getCampers(): Promise<CamperDto[]> {
    return this.queryBus.execute<CampersQuery, CamperDto[]>(new CampersQuery());
  }

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest
  ): Promise<CamperDto> {
    const camper = await this.commandBus.execute<CreateCamperCommand, CamperSchema>(
      new CreateCamperCommand(createCamperRequest)
    );
    return this.getCamper(camper._id.toString());
  }

  @Patch(":id/allergies")
  async updateCamperAllergies(
    @Param("id") camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest
  ): Promise<CamperDto> {
    await this.commandBus.execute<UpdateAllergiesCommand, void>(
      new UpdateAllergiesCommand(
        camperId,
        updateCamperAllergiesRequest.allergies
      )
    );
    return this.getCamper(camperId);
  }
}
