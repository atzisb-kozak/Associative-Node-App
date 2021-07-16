import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateSachetInput {

	@Field()
	poids: number

	@Field(() => [Number])
	combinaison: number[];
}