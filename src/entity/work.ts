import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Work {
  @PrimaryGeneratedColumn("uuid")
  work_id: string;

  @Column()
  work_title: string;

  @Column()
  user_id: string;

  @Column()
  username: string;

  @Column()
  kind: string;

  @Column("mediumtext")
  content: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
