import { initialState } from './index';

export default function reducer(state = {}, action = {}) {
	switch (action.type) {
		case "focus":
			return {
				scene: action.scene
			};

		default:
			return state;
	}
}