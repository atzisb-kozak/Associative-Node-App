/**
 * Import Modules
 */
import { InputType, Field } from 'type-graphql';

/**
 * Input for create new Sachet's object
 *
 * @export
 * @class CreateSachetInput
 */
@InputType()
export class CreateSachetInput {

	@Field()
	poids: number

	@Field(() => [Number])
	combinaison: number[];
}