import {
	ADD_FEEL,
	SELECT_FEEL,
	UPDATE_SELECTED_FEEL_DESCRIPTION,
	CLEAR_SELECTED_FEEL,
} from '../actions';

export default function feels(state = [], action) {
	switch(action.type) {
		case ADD_FEEL:
			return [
				...state,
				{
					id: action.id + 1,
					type: undefined,
					description: undefined,
					datetime: undefined
				},
			]
		case SELECT_FEEL:
			if (state.length === 0) { 
				return [
					{ 
						id: action.id,
						type: action.feel,
						description: undefined
					}
				]
			}
			return state.map(feel => 
				feel.id === action.id ? 
					Object.assign({}, feel, { type: action.feel }) :
					feel
			)
		case UPDATE_SELECTED_FEEL_DESCRIPTION:
			return state.map(feel => 
				feel.id === action.id ? 
					Object.assign({}, feel, { description: action.description }) :
					feel
			)
		case CLEAR_SELECTED_FEEL:
			return Object.assign({}, state, {
			});
		default:
			return state;
	}
}