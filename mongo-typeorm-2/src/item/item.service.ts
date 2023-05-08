import { Injectable  } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { Repository, MongoRepository } from "typeorm";
import { ObjectId } from 'mongodb';
import { ItemDto } from "./item.dto";


@Injectable()
export class ItemService {

  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>
    //@InjectRepository(Item) private readonly itemRepository: MongoRepository<Item>
  ) {
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    return await this.itemRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async createItem(item: Item): Promise<Item>  {
    return await this.itemRepository.save(item);
  }

  async update(id: string, newItem: ItemDto): Promise<Item>  {
    const item = await this.itemRepository.findOneBy({ _id: new ObjectId(id) });
    await this.itemRepository.merge(item, newItem);
    return await this.itemRepository.save(item);
  }

  async delete(id: string) {
    return await this.itemRepository.delete(id);
    // return await this.itemRepository.delete(new ObjectId(id));
  }
}
