import {
	ADD_FEEL,
} from '../actions';
import { initialState } from './index';
import feel from './feel';

export function feelsLog(state = [], action) {
	switch(action.type) {
		case ADD_FEEL:
			return Object.assign({}, state, {
				feelsLog: [
					...state,
					feel(undefined, action)
				]
			});
		default:
			return state
	}
}
