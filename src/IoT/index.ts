/* eslint-disable no-console */
import { sum } from 'lodash';
import BestWeight, {IData} from './operations/BestWeight';

async function index() {
	try{
		const result: IData = {
			weights: [125,130,250,235,190,175,164,202,137,129,241,223].sort((a,b) => b-a),
			pesons: [1,2,3,4,5,6,7,8,9,10,11,0]
		};
		const bestWeight = new BestWeight();
		console.time('start');
		console.log((await bestWeight.getAllCombinaison(result.weights, 3, 5)).
			filter(array => {
				let framing = sum(array);
				return framing < 515 && framing >= 505;
			}
		));
		console.timeEnd('start');

		//const results = await bestWeight.bestWeightOperation(result);
		//console.log(results);
	} catch (error) {
		console.error(error);
	}
}

index();
