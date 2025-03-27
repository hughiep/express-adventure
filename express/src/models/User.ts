import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // User entity properties
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
