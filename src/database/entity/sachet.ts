/**
 * Import Modules
 */
import { 
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
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

	// simple array of number store valid combinaison
	@Field(() => [Number], { nullable: true })
	@Column("simple-array", { nullable: true })
	combinaison: number[];

	// Timestamps
	@Field(() => Date)
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@Field(() => Date)
	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}