import { Sachet } from "database/entity/sachet";

/**
 * Payload contains operation success and data or error
 *
 * @export
 * @interface SachetPayload
 */
export interface SachetPayload {
	success: boolean;
	data?: Sachet;
	error?: string;
}

