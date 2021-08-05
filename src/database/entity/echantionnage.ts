import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

/**
 * Echantion's representation for Postgres database
 * 
 * arbitrarily take sachet's and check weight 
 *
 * @export
 * @class Echantionnage
 * @extends {BaseEntity}
 */
@Entity()
@ObjectType()
export class Echantionnage extends BaseEntity {

	@Field(() => ID)
	@PrimaryGeneratedColumn()
	echantionNumber: number;

	@Field(() => Number)
	@Column()
	poidsGenerated: number;

	@Field(() => Number)
	@Column()
	poidsMeasured: number;

	@Field(() => Date)
	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@Field(() => Date)
	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;
}