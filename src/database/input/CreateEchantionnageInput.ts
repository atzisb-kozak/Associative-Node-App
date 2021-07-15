import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateEchantionnageInput {

	@Field()
	poidsGenerated: number

	@Field()
	poidsMeasured: number;
}