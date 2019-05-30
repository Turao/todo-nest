import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  @Column({ length: 300 })
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
