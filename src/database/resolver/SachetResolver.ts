/**
 * Import modules
 */
import { getRepository, Repository } from 'typeorm';
import { Sachet } from '../entity/sachet';
import { CreateSachetInput, UpdateSachetInput } from './input';
import { logger } from '../../logger';
import { IResolvers } from 'apollo-server-express';
import { SachetPayload } from './SachetPayload';

const _sachetRepository: Repository<Sachet> = getRepository(Sachet);

/**
 * Args for FindOne resolvers
 *
 * @interface FindOneSachetArgs
 */
interface FindOneSachetArgs {
	sachetID: number
}

/**
 * Args for Create resolvers
 *
 * @interface CreateSachetArgs
 */
interface CreateSachetArgs {
	data: CreateSachetInput;
}

/**
 * Args for Update resolvers
 *
 * @interface UpdateSachetArgs
 */
interface UpdateSachetArgs {
	sachetID: number;
	data: UpdateSachetInput;
}

/**
 * Args for Delete resolvers
 *
 * @interface DeleteSachetArgs
 */
interface DeleteSachetArgs {
	sachetID: number;
}

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
		 */
		sachet: async (): Promise<Sachet[]> => {
			return _sachetRepository.find();
		},

		/**
		 * Find specific Sachet with ID Field
		 *
		 * @param {number} id
		 * @return {Sachet | undefined} 
		 */
		sachetID: async(_, args: FindOneSachetArgs): Promise<Sachet | undefined> => {
			return _sachetRepository.findOne(args.sachetID);
		},
	},

	Mutation: {
		/**
		 * Create new Sachet data to store in database
		 *
		 * @param {CreateSachetArgs} args contains data to create Sachet
		 * @return {SachetPayload} return operation's success or failure
		 */
		createSachet: async(_,args:CreateSachetArgs): Promise<SachetPayload>=> {
			try {
				const sachet = _sachetRepository.create(args.data);
				await sachet.save();
				return{
					success: true,
					data: sachet
				};
			} catch (error) {
				logger.error(`[SachetResolver](createSachet) : ${error.message}`);
				return {
					success: false,
					error: error.message
				};
			}
			
		},

		/**
		 * Update specific Sachet's data 
		 * 
		 * Raise a UserInputError if data's ID isn't stored in database
		 *
		 * @param {UpdateSachetArgs} args contains data and id to update existing data
		 * @return {SachetPayload} return operations's success or failure
		 */
		updateSachet: async(_, args: UpdateSachetArgs):  Promise<SachetPayload> => {

			try {
				const nbAffect = (await _sachetRepository.update(args.sachetID, {...args.data})).affected;
				if (nbAffect !== 0){
					return{
						success: true,
					};
				}
				throw new Error('data wasn\'t stored in database');
			} catch (error) {
				logger.error(`[SachetResolver](updateSachet) : ${error.message}`);
				return {
					success: false,
					error: error.message
				};
			}
		},

		/**
		 * Delete Sachet's data in database.
		 * 
		 * Raise a UserInputError if data's ID isn't stored in database
		 *
		 * @param {DeleteSachetArgs} args contains id to delete existing data
		 * @return {SachetPayload} return operations's success or failure
		 */
		deleteSachet: async (_, args: DeleteSachetArgs): Promise<SachetPayload> => {
			try {
				const nbAffect = (await _sachetRepository.delete(args.sachetID)).affected;
				if (nbAffect !== 0) {
					return {
						success: true
					};
				}
				throw new Error('data wasn\'t stored in database');
			}catch (error) {
				logger.error(`[SachetResolver](deleteSachet) : ${error.message}`);
				return {
					success: false,
					error: error.message
				};
			}
			
		}
	}
};