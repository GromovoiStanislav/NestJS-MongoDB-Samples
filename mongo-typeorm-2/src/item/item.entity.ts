import { Entity, ObjectId, Column, ObjectIdColumn } from "typeorm";


@Entity()
export class Item {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ length: 100 })
  name: string;

  @Column("text")
  description: string;

  @Column("int")
  qty: number;
}
