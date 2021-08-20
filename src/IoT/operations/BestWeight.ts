export interface IData {
	weights: number[];
	pesons: number[];
}

export interface IResult {
	weight: number;
	combinaison: number[];
}

/**
 * Main Operation class to operate endives's combinaisons
 *
 * @export
 * @class BestWeight
 */
export default class BestWeight {
	
	constructor() {}

	/**
	 *
	 *
	 * @param {number[]} array
	 * @param {number} minLenght
	 * @param {number} maxLenght
	 * @return {*}  {Promise<number[][]>}
	 * @memberof BestWeight
	 */
	public async getAllCombinaison(
		array: number[], minLenght: number, maxLenght: number): Promise<number[][]> {

		let result: number[][] = [];
		let excutionProcess: Promise<void>[] = [];
		for (let i = minLenght; i < maxLenght + 1; i++) {
			excutionProcess.push(this.combine(i, array, [], result));
		}
		Promise.all(excutionProcess);
		return result;
	}

	private async combine (
		index: number, arraySource: number[], arrayTarget: number[], result: number[][]
	): Promise<void>{

		if (index == 0) {
			if (arrayTarget.length >= 3 && arrayTarget.length <= 5) {
				result[result.length] = arrayTarget;
			}
			return;
		}
		for (let j = 0; j < arraySource.length; j++) {
			this.combine(
				index - 1,
				arraySource.slice(j + 1),
				arrayTarget.concat([arraySource[j]]),
				result);
		}
		return;
	}
}