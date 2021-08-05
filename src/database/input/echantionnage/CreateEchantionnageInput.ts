/**
 * Import Modules
 */
import { InputType, Field, Int } from 'type-graphql';

/**
 * Input to create new Echantionnage's object
 *
 * @export
 * @class CreateEchantionnageInput
 */
@InputType()
export class CreateEchantionnageInput {

	@Field(() => Int)
	poidsGenerated: number;

	@Field(() => Int)
	poidsMeasured: number;
}