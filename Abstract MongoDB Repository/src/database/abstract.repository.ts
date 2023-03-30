import { Document, FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { NotFoundException } from "@nestjs/common";


export abstract class AbstractRepository<TDocument extends Document> {

  protected constructor(protected readonly model: Model<TDocument>) {
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    projection?: Record<string, unknown>
  ): Promise<TDocument | null> {
    const document = await this.model.findOne(filterQuery, { _id: 0, __v: 0, ...projection }, { lean: true });
    if (!document) {
      throw new NotFoundException("Document not found");
    }
    return document;
  }

  async find(
    filterQuery: FilterQuery<TDocument>
  ): Promise<TDocument[]> {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async create(document: Omit<TDocument, "_id">): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId()
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateData: UpdateQuery<TDocument>
  ): Promise<TDocument | null> {
    const document = await this.model.findOneAndUpdate(filterQuery, updateData, {
      lean: true,
      new: true
    });
    if (!document) {
      throw new NotFoundException("Document not found.");
    }
    return document;
  }

  async deleteMany(filterQuery: FilterQuery<TDocument>): Promise<boolean> {
    const deleteResult = await this.model.deleteMany(filterQuery);
    return deleteResult.deletedCount >= 1;
  }

}