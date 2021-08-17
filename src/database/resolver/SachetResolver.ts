/**
 * Import modules
 */
import { UserInputError } from 'apollo-server-express';
import { getRepository, Repository } from 'typeorm';
import { Sachet } from '../entity/sachet';
import { CreateSachetInput, UpdateSachetInput } from './input';
import { logger } from '../../logger';
import { IResolvers } from 'apollo-server-express';

const _sachetRepository: Repository<Sachet> = getRepository(Sachet);

/**
 * GraphQL Resolvers for Sachet's data
 *
 * @export
 */
export const sachetResolver: IResolvers = {
	Query: {
		/**
		 * All find Sachet Query
		 *
		 * @return {Sachet[]} Promise<Sachet[]>
		 * @memberof SachetResolver
		 */
		sachet: async (): Promise<Sachet[]> => {
			return _sachetRepository.find();
		},

		/**
		 * Find specific Sachet with ID Field
		 *
		 * @param {number} id
		 * @return {Sachet | undefined} 
		 * @memberof SachetResolver
		 */
		sachetID: async(id : number): Promise<Sachet | undefined> => {
			return _sachetRepository.findOne(id);
		},
	},

	Mutation: {
		/**
		 * Create new Sachet data to store in database
		 *
		 * @param {CreateSachetInput} data
		 * @return {*} 
		 * @memberof SachetResolver
		 */
		createSachet: async(data: CreateSachetInput): Promise<Sachet>=> {
			const sachet = _sachetRepository.create({...data});
			await sachet.save();
			return sachet;
		},

		/**
		 * Update specific Sachet's data 
		 * 
		 * Raise a UserInputError if data's ID isn't stored in database
		 *
		 * @param {number} id
		 * @param {UpdateSachetInput} data
		 * @return {*} 
		 * @memberof SachetResolver
		 */
		updateSachet: async(id: number, data: UpdateSachetInput):  Promise<boolean> => {

			try {
				const nbAffect = (await _sachetRepository.update(id, {...data})).affected;
				if (nbAffect !== 0){
					return true;
				}
				throw new Error('data wasn\'t stored in database');
			} catch (error) {
				logger.error(`[SachetResolver](updateSachet) : ${error.message}`);
				throw new UserInputError(error.message);
			}
		},

		/**
		 * Delete Sachet's data in database.
		 * 
		 * Raise a UserInputError if data's ID isn't stored in database
		 *
		 * @param {number} id
		 * @return {*} 
		 * @memberof SachetResolver
		 */
		deleteSachet: async (id: number): Promise<boolean> => {
			try {
				const nbAffect = (await _sachetRepository.delete(id)).affected;
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
};