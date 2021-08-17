/**
 * Import Modules
 */
import { IResolvers, UserInputError } from 'apollo-server-express';
import { Repository, getRepository } from 'typeorm';
import { Echantionnage } from '../entity/echantionnage';
import { CreateEchantionnageInput, UpdateEchantionnageInput} from './input';
import { logger } from '../../logger';

const _echantionnageRepository: Repository<Echantionnage> = getRepository(Echantionnage);

/**
 * GraphQL Resolvers for Echantionnage's data
 *
 * @export
 * @class EchantionnageResolver
 */
export const echantionnageResolver: IResolvers = {
	Query: {
		/**
		 * find all Echantionnage data Query
		 *
		 * @return {Echantionnage[]}  {Promise<Echantionnage[]>}
		 * @memberof EchantionnageResolver
		 */
		echantionnage: async(): Promise<Echantionnage[]> => {
			return _echantionnageRepository.find();
		},

		/**
		 * Find specific Ecahntionnage with ID Field
		 *
		 * @param {number} id
		 * @return {Sachet | undefined}  {(Promise<Echantionnage | undefined>)}
		 * @memberof EchantionnageResolver
		 */
		echantionnageID: (id : number): Promise<Echantionnage | undefined> => {

			return _echantionnageRepository.findOne(id);
		}
	},
	
	Mutation: {
		/**
		 * Create new Ecahntionnage's data to store in database
		 *
		 * @param {CreateEchantionnageInput} data
		 * @return {*} 
		 * @memberof EchantionnageResolver
		 */
		createEchantionnage: async (data: CreateEchantionnageInput): Promise<Echantionnage> => {
			const echantionnage = Echantionnage.create(data);
			await echantionnage.save();
			return echantionnage;
		},

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
		updateEchantionnage: async (id: number, data: UpdateEchantionnageInput): Promise<boolean> => {
			try {
				const nbAffect = (await _echantionnageRepository.update(id, {...data})).affected;
				if (nbAffect !== 0){
					return true;
				}
				throw new Error('data wasn\'t stored in database');
			} catch (error) {
				logger.error(`[EchantionnageResolver](updateEchantionnage) : ${error.message}`);
				throw new UserInputError(error.message);
			}
		},

		/**
		 *Update specific Echantionnage's data 
		* 
		* Raise a UserInputError if data's ID isn't stored in database
		*
		* @param {number} id
		* @return {*}  {Promise<boolean>}
		* @memberof EchantionnageResolver
		*/
		deleteEchantionnage: async (id: number): Promise<boolean> => {
			try {
				const nbAffect = (await _echantionnageRepository.delete(id)).affected;
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
}