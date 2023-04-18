import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CamperDtoRepository } from '../../db/camper-dto.repository';
import { CamperQuery } from './camperQuery';
import { CamperDto } from "../../dto/camper.dto";

@QueryHandler(CamperQuery)
export class CamperHandler implements IQueryHandler<CamperQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute({ camperId }:CamperQuery): Promise<CamperDto> {
    return this.camperDtoRepository.findOneById(camperId);
  }
}