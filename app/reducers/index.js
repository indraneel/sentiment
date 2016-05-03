import { combineReducers } from 'redux'
import {
	SELECT_FEEL,
	UPDATE_SELECTED_FEEL_DESCRIPTION,
	CLEAR_SELECTED_FEEL,
	ADD_FEEL,
} from '../actions'

import feels from './feels';
import routes from './routes';

export const initialState = {
	scene: {},
	user: {},
	feels: [],
}

const reducer = combineReducers({
	feels,
	routes,
})

export default reducer;