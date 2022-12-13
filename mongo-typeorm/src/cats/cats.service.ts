import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { Cat } from './cats.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: MongoRepository<Cat>
  ) {}

  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsRepository.save(createCatDto);
  }

  async findOne(id: string): Promise<Cat> {
    return await this.catsRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async delete(id: string) {
    const result = await this.catsRepository.deleteOne({
      _id: new ObjectId(id),
    });
    return result.deletedCount;
  }
}
