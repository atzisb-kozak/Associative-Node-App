/**
 * Import Modules
 */
import { IResolvers, UserInputError } from 'apollo-server-express';
import { Repository, getRepository } from 'typeorm';
import { Echantionnage } from '../entity/echantionnage'
import { EchantionnagePayload } from './EchantionnagePayload';
import { CreateEchantionnageInput, UpdateEchantionnageInput} from './input';
import { logger } from '../../logger';

const _echantionnageRepository: Repository<Echantionnage> = getRepository(Echantionnage);

/**
 * Args for FindOne resolvers
 *
 * @interface FindOneEchantionnageArgs
 */
interface FindOneEchantionnageArgs {
	echantionID: number
}
/**
 * Args for Create resolvers
 *
 * @interface CreateEchantionnageArgs
 */
interface CreateEchantionnageArgs {
	echantillon: CreateEchantionnageInput;
}
/**
 * Args for Update resolvers
 *
 * @interface UpdateEchantionnageArgs
 */
interface UpdateEchantionnageArgs {
	echantionID: number;
	echantillon: UpdateEchantionnageInput;
}
/**
 * Args for Delete resolvers
 *
 * @interface DeleteEchantionnageArgs
 */
interface DeleteEchantionnageArgs {
	echantionID: number;
}

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
		 * @return {Echantionnage | undefined}  {(Promise<Echantionnage | undefined>)}
		 */
		echantionnageID: (_, args: FindOneEchantionnageArgs): Promise<Echantionnage | undefined> => {

			return _echantionnageRepository.findOne(args.echantionID);
		}
	},
	
	Mutation: {
		/**
		 * Create new Echantionnage's data to store in database
		 *
		 * @param {CreateEchantionnageInput} data
		 * @return {EchantionnagePayload} Payload contain data or error, success depends of 
		 */
		createEchantionnage: async (_, args: CreateEchantionnageArgs): Promise<EchantionnagePayload> => {
			try{
				const echantionnage = Echantionnage.create(args.echantillon);
				await echantionnage.save();
				return {
					success: true,
					data: echantionnage
				}
			} catch (error) {
				logger.error(`[EchantionnageResolver](createEchantionnage) : ${error.message}`)
				return {
					success: false,
					error: error.message
				}
			}

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
		updateEchantionnage: async (_, args: UpdateEchantionnageArgs): Promise<EchantionnagePayload> => {
			try {
				const nbAffect = (
					await _echantionnageRepository.update(args.echantionID, {...args.echantillon})).affected;

				if (nbAffect !== 0){
					return {
						success: true,
					}
				}
				throw new Error('data wasn\'t stored in database');
			} catch (error) {
				logger.error(`[EchantionnageResolver](updateEchantionnage) : ${error.message}`);
				return {
					success: false,
					error: error.message
				}
			}
		},

		/**
		* Delete specific Echantionnage's data 
		* 
		* Raise a UserInputError if data's ID isn't stored in database
		*
		* @param {number} id
		* @return {*}  {Promise<boolean>}
		* @memberof EchantionnageResolver
		*/
		deleteEchantionnage: async (_, args: DeleteEchantionnageArgs): Promise<EchantionnagePayload> => {
			try {
				const nbAffect = (await _echantionnageRepository.delete(args.echantionID)).affected;
				if (nbAffect !== 0) {
					return {
						success: true
					};
				}
				throw new Error('data wasn\'t stored in database');
			}catch (error) {
				logger.error(`[EchantionnageResolver](deleteEchantionnage) : ${error.message}`);
				return {
					success: false,
					error: error.message
				}
			}
		}
	}
}