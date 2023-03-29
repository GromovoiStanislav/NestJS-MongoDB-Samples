import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";


export abstract class EntityRepository<TDocument extends Document> {

  protected constructor(protected readonly model: Model<TDocument>) {
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    projection?: Record<string, unknown>
  ): Promise<TDocument | null> {
    return this.model.findOne(filterQuery, { _id: 0, __v: 0, ...projection });
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery);
  }

  async create(documentData: unknown): Promise<TDocument> {
    const createdDocument = new this.model(documentData);
    return createdDocument.save();
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateData: UpdateQuery<unknown>
  ): Promise<TDocument | null> {
    return this.model.findOneAndUpdate(filterQuery, updateData, { new: true });
  }

  async deleteMany(filterQuery: FilterQuery<TDocument>): Promise<boolean> {
    const deleteResult = await this.model.deleteMany(filterQuery);
    return deleteResult.deletedCount >= 1;
  }

}