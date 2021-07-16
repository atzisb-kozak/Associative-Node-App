/**
 * Import Modules
 */
import { Sachet } from '../../entity/sachet';
import { InputType, Field } from 'type-graphql';

/**
 *
 *
 * @export
 * @class UpdateSachetInput
 * @implements {Partial<Sachet>}
 */
@InputType()
export class UpdateSachetInput implements Partial<Sachet> {

	@Field()
	poids?: number

	@Field(() => [Number], {  })
	combinaison?: number[];
}