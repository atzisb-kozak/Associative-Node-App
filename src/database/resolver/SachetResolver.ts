/**
 * Import modules
 */
import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { Sachet } from '../entity/sachet';
import { CreateSachetInput } from '../input/sachet/CreateSachetInput';
import { UpdateSachetInput } from '../input/sachet/UpdateSachetInput';
import { logger } from '../../logger';

/**
 * GraphQL Resolvers for Sachet's data
 *
 * @export
 * @class SachetResolver
 */
@Resolver(Sachet)
export class SachetResolver {
	constructor(
		@InjectRepository(Sachet) private readonly _sachetRepository: Repository<Sachet>,
	) {}

	/**
	 * All find Sachet Query
	 *
	 * @return {Sachet[]} Promise<Sachet[]>
	 * @memberof SachetResolver
	 */
	@Query(() => [Sachet])
	async sachet(): Promise<Sachet[]> {
		return this._sachetRepository.find();
	}

	/**
	 *
	 *
	 * @param {number} id
	 * @return {Sachet | undefined} 
	 * @memberof SachetResolver
	 */
	@Query(() => Sachet)
	async sachetID(@Arg('sachetID', type => ID) id : number): Promise<Sachet | undefined> {
		return this._sachetRepository.findOne(id);
	}

	/**
	 *
	 *
	 * @param {CreateSachetInput} data
	 * @return {*} 
	 * @memberof SachetResolver
	 */
	@Mutation(returns => Sachet)
	async createSachet(@Arg('data') data: CreateSachetInput): Promise<Sachet> {
		const sachet = this._sachetRepository.create({...data});
		await sachet.save();
		return sachet;
	}

	/**
	 *
	 *
	 * @param {number} id
	 * @param {UpdateSachetInput} data
	 * @return {*} 
	 * @memberof SachetResolver
	 */
	@Mutation(returns => Boolean)
	async updateSachet(
		@Arg('sachetID', type => ID) id: number,
		@Arg('data') data: UpdateSachetInput):  Promise<boolean> 
	{

		try {
			const nbAffect = (await this._sachetRepository.update(id, {...data})).affected;
			if (nbAffect !== 0){
				return true;
			}
			throw new Error('data wasn\'t stored in database');
		} catch (error) {
			logger.error(`[SachetResolver](updateSachet) : ${error.message}`);
			throw new UserInputError(error.message);
		}
	}

	/**
	 *
	 *
	 * @param {number} id
	 * @return {*} 
	 * @memberof SachetResolver
	 */
	@Mutation(returns => Boolean)
	async deleteSachet(@Arg('sachetID', type => ID) id: number): Promise<boolean> {
		try {
			const nbAffect = (await this._sachetRepository.delete(id)).affected;
			if (nbAffect !== 0) {
				return true;
			}
			throw new Error('data wasn\'t stored in database');
		}catch (error) {
			logger.error(`[SachetResolver](deleteSachet) : ${error.message}`);
			throw new UserInputError(error.message);
		}
		
	}
}