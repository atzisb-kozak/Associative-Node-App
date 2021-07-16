import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Echantionnage } from '../entity/echantionnage';
import { CreateEchantionnageInput } from '../input/echantionnage/CreateEchantionnageInput';

@Resolver()
export class EchantionnageResolver {
	@Query(() => [Echantionnage])
	echantionnage() {
		return Echantionnage.find();
	}

	@Mutation(() => Echantionnage)
	async createEchantionnage(@Arg('echantillon') echantillon: CreateEchantionnageInput) {
		const echantionnage = Echantionnage.create(echantillon);
		await echantionnage.save();
		return echantionnage;
	}
}