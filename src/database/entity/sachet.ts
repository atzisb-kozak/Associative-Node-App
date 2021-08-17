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

/**
 * Sachet's representation for Postgres database
 *
 * @export
 * @class Sachet
 */
@Entity()
export class Sachet extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	poids: number;

	// simple array of number store valid combinaison
	@Column("simple-array", { nullable: true })
	combinaison: number[];

	// Timestamps
	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;
}