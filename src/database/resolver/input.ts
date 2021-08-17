/**
 *
 *
 * @export
 * @interface CreateEchantionnageInput
 */
export interface CreateEchantionnageInput {
	poidsMeasured: number;
	poidsGenerated: number;
}

/**
 *
 *
 * @export
 * @interface UpdateEchantionnageInput
 */
export interface UpdateEchantionnageInput {
	poidsMeasured?: number;
	poidsGenerated?: number;
}

/**
 *
 *
 * @export
 * @interface CreateSachetInput
 */
export interface CreateSachetInput {
	combinaison: number[];
	poids: number;
}

/**
 *
 *
 * @export
 * @interface UpdateSachetInput
 */
export interface UpdateSachetInput {
	combinaison?: number[];
	poids?: number;
}