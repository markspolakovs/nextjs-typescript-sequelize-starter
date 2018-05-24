import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table({ timestamps: true, paranoid: true })
export default class Project extends Model<Project> {
  @Column name!: string;
  @Column slug!: string;

  @CreatedAt
//   @Column
  createdAt!: Date;

  @UpdatedAt
//   @Column
  updatedAt!: Date;

  @DeletedAt
//   @Column
  deletedAt!: Date;
}
