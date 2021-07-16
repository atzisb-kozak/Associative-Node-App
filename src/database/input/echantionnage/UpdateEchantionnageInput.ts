import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateEchantionnageInput {

	@Field()
	poidsGenerated: number

	@Field()
	poidsMeasured: number;
}