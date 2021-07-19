/**
 * Import Modules
 */
import { UserInputError } from 'apollo-server-express';
import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Echantionnage } from '../entity/echantionnage';
import { CreateEchantionnageInput } from '../input/echantionnage/CreateEchantionnageInput';
import { UpdateEchantionnageInput } from '../input/echantionnage/UpdateEchantionnageInput';
import { logger } from '../../logger';

/**
 * GraphQL Resolvers for Echantionnage's data
 *
 * @export
 * @class EchantionnageResolver
 */
@Resolver()
export class EchantionnageResolver {
	constructor(
		@InjectRepository(Echantionnage)
		private readonly _echantionnageRepository: Repository<Echantionnage>
	) {}

	/**
	 * find all Echantionnage data Query
	 *
	 * @return {Echantionnage[]}  {Promise<Echantionnage[]>}
	 * @memberof EchantionnageResolver
	 */
	@Query(() => [Echantionnage])
	async echantionnage(): Promise<Echantionnage[]>{
		return this._echantionnageRepository.find();
	}

	/**
	 * Find specific Ecahntionnage with ID Field
	 *
	 * @param {number} id
	 * @return {Sachet | undefined}  {(Promise<Echantionnage | undefined>)}
	 * @memberof EchantionnageResolver
	 */
	@Query(() => Echantionnage)
	async echantionnageID(
		@Arg('echantionID', type => ID) id : number): Promise<Echantionnage | undefined> {

		return this._echantionnageRepository.findOne(id);
	}

	/**
	 * Create new Ecahntionnage's data to store in database
	 *
	 * @param {CreateEchantionnageInput} data
	 * @return {*} 
	 * @memberof EchantionnageResolver
	 */
	@Mutation(() => Echantionnage)
	async createEchantionnage(@Arg('echantillon') data: CreateEchantionnageInput) {
		const echantionnage = Echantionnage.create(data);
		await echantionnage.save();
		return echantionnage;
	}

	/**
	 * Update specific Echantionnage's data 
	 * 
	 * Raise a UserInputError if data's ID isn't stored in database
	 *
	 * @param {number} id
	 * @param {UpdateEchantionnageInput} data
	 * @return {*}  {Promise<boolean>}
	 * @memberof EchantionnageResolver
	 */
	@Mutation(() => Boolean)
	async updateEchantionnage(
		@Arg('echantionID', type => ID) id: number,
		@Arg('echantillon') data: UpdateEchantionnageInput
	): Promise<boolean> {

		try {
			const nbAffect = (await this._echantionnageRepository.update(id, {...data})).affected;
			if (nbAffect !== 0){
				return true;
			}
			throw new Error('data wasn\'t stored in database');
		} catch (error) {
			logger.error(`[EchantionnageResolver](updateEchantionnage) : ${error.message}`);
			throw new UserInputError(error.message);
		}
	}

	/**
	 *Update specific Echantionnage's data 
	 * 
	 * Raise a UserInputError if data's ID isn't stored in database
	 *
	 * @param {number} id
	 * @return {*}  {Promise<boolean>}
	 * @memberof EchantionnageResolver
	 */
	@Mutation(() => Boolean)
	async deleteEchantionnage(@Arg('echantionID', type => ID) id: number): Promise<boolean> {
		try {
			const nbAffect = (await this._echantionnageRepository.delete(id)).affected;
			if (nbAffect !== 0) {
				return true;
			}
			throw new Error('data wasn\'t stored in database');
		}catch (error) {
			logger.error(`[EchantionnageResolver](deleteEchantionnage) : ${error.message}`);
			throw new UserInputError(error.message);
		}
		
	}
}