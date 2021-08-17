import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";

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
export class Echantionnage extends BaseEntity {

	@PrimaryGeneratedColumn()
	echantionNumber: number;

	@Column()
	poidsGenerated: number;

	@Column()
	poidsMeasured: number;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;
}