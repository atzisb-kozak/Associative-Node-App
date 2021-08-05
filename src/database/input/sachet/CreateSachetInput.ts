/**
 * Import Modules
 */
import { InputType, Field, Int } from 'type-graphql';

/**
 * Input for create new Sachet's object
 *
 * @export
 * @class CreateSachetInput
 */
@InputType()
export class CreateSachetInput {

	@Field(() => Int)
	poids: number

	@Field(() => [Int])
	combinaison: number[];
}