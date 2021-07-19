/**
 * Import Modules
 */
import { InputType, Field } from 'type-graphql';

/**
 * Input to create new Echantionnage's object
 *
 * @export
 * @class CreateEchantionnageInput
 */
@InputType()
export class CreateEchantionnageInput {

	@Field()
	poidsGenerated: number;

	@Field()
	poidsMeasured: number;
}