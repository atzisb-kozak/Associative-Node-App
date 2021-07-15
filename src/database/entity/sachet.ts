import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

/**
 * Sachet's representation for Postgres database
 *
 * @export
 * @class Sachet
 */
@Entity()
@ObjectType()
export class Sachet extends BaseEntity {

	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => Number)
	@Column()
	poids: number;

	@Field(() => [Number])
	@Column("simple-array")
	combinaison: number[];
}