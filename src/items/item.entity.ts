import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly title: string;

  @Column()
  readonly content: string;

  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }
}
