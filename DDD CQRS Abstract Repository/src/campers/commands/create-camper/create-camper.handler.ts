import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CamperFactory } from "../../camper.factory";
import { CreateCamperCommand } from "./create-camper.command";
import { Camper } from "../../Camper";

@CommandHandler(CreateCamperCommand)
export class CreateCamperHandler
  implements ICommandHandler<CreateCamperCommand> {
  constructor(
    private readonly camperFactory: CamperFactory,
    private readonly eventPublisher: EventPublisher
  ) {
  }

  async execute({ createCamperRequest }: CreateCamperCommand): Promise<Camper> {
    const { name, age, allergies } = createCamperRequest;
    const camper = this.eventPublisher.mergeObjectContext(
      await this.camperFactory.create(name, age, allergies)
    );
    camper.commit();
    return camper
  }
}