/**
 * Import Modules
 */
import { Sachet } from '../../entity/sachet';
import { InputType, Field, Int } from 'type-graphql';

/**
 * Input for update existing Sachet's object
 *
 * @export
 * @class UpdateSachetInput
 * @implements {Partial<Sachet>}
 */
@InputType()
export class UpdateSachetInput implements Partial<Sachet> {

	@Field(() => Int)
	poids?: number

	@Field(() => [Int], {  })
	combinaison?: number[];
}