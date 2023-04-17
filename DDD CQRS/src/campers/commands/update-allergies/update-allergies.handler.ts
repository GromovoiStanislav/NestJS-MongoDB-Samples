import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CamperEntityRepository } from "../../db/camper-entity.repository";
import { UpdateAllergiesCommand } from "./update-allergies.command";
import { Camper } from "../../Camper";
import { UpdateAllergiesEvent } from "../../events/update-allergies/update-allergies.event";


@CommandHandler(UpdateAllergiesCommand)
export class UpdateAllergiesHandler
  implements ICommandHandler<UpdateAllergiesCommand> {
  constructor(
    private readonly camperEntityRepository: CamperEntityRepository,
    private readonly eventPublisher: EventPublisher
  ) {
  }

  async execute({ camperId, allergies }: UpdateAllergiesCommand): Promise<Camper> {
    const camper = this.eventPublisher.mergeObjectContext(
      await this.camperEntityRepository.findOneById(camperId)
    );

    camper.updateAllergies(allergies);
    await this.camperEntityRepository.findOneAndReplaceById(camperId, camper);

    camper.apply(new UpdateAllergiesEvent(camperId));

    camper.commit();
    return camper
  }
}