import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CamperSchema } from "./camper.schema";
import { CamperDto } from "../dto/camper.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class CamperDtoRepository {

  constructor(
    @InjectModel(CamperSchema.name) private readonly camperModel: Model<CamperSchema>) {
  }


  async findOneById(id: string): Promise<CamperDto> {

    const camper = await this.camperModel.findOne({ _id: new ObjectId(id) }, {}, { lean: true });

    if (!camper) throw new NotFoundException("Entity was not found.");

    const _id = camper._id.toString();
    const allergiesLower = camper.allergies.map(allergy => allergy.toLocaleLowerCase());
    const isAllergicToPeanuts = allergiesLower.includes("peanuts");

    return {
      ...camper,
      _id,
      isAllergicToPeanuts
    };

  }


  async findAll(): Promise<CamperDto[]> {

    const campers = await this.camperModel.find({}, {}, { lean: true });

    return campers.map(camper => {

      const _id = camper._id.toString();
      const allergiesLower = camper.allergies.map(allergy => allergy.toLocaleLowerCase());
      const isAllergicToPeanuts = allergiesLower.includes("peanuts");

      return {
        ...camper,
        _id,
        isAllergicToPeanuts
      };

    });

  }

}