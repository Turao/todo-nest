import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly title: string;

  @Column()
  readonly content: string;

  @ManyToOne(type => UserEntity, user => user.products)
  owner: UserEntity;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
