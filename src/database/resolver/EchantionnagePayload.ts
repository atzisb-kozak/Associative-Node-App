import { Echantionnage } from "database/entity/echantionnage";

/**
 * Payload contains operation success and data or error
 *
 * @export
 * @interface EchantionnagePayload
 */
export interface EchantionnagePayload {
	success: boolean;
	data?: Echantionnage;
	error?: string;
}