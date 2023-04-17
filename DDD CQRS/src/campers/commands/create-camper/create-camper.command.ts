import { CreateCamperRequest } from '../../dto/create-camper-request.dto';

export class CreateCamperCommand {
  constructor(public readonly createCamperRequest: CreateCamperRequest) {}
}