/**
 * Import Module
 */
import { Echantionnage } from '../../entity/echantionnage';
import { InputType, Field, Int } from 'type-graphql';

/**
 * Input for update existing Echantionnage's object
 *
 * @export
 * @class UpdateEchantionnageInput
 * @implements {Partial<Echantionnage>}
 */
@InputType()
export class UpdateEchantionnageInput implements Partial<Echantionnage> {

	@Field(() => Int)
	poidsGenerated: number;

	@Field(() => Int)
	poidsMeasured: number;
}