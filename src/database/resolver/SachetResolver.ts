import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Sachet } from '../entity/sachet';
import { CreateSachetInput } from '../input/CreateSachetInput';

@Resolver()
export class SachetResolver {
	@Query(() => [Sachet])
	sachet() {
		return Sachet.find();
	}

	@Mutation(() => Sachet)
	async createSachet(@Arg('data') data: CreateSachetInput) {
		const sachet = Sachet.create(data);
		await sachet.save();
		return sachet;
	}
}