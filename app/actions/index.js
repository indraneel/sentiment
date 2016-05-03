/**
* action types
*/

export const SELECT_FEEL = 'SELECT_FEEL'
export const CLEAR_SELECTED_FEEL = 'CLEAR_SELECTED_FEEL';
export const UPDATE_SELECTED_FEEL_DESCRIPTION = 'UPDATE_SELECTED_FEEL_DESCRIPTION'
export const ADD_FEEL = 'ADD_FEEL'

export const emojis = {
	GREAT: 'GREAT',
	GOOD: 'GOOD',
	GETTING_THERE: 'GETTING_THERE',
	ANNOYED: 'ANNOYED',
	ANGRY: 'ANGRY',
	SAD: 'SAD'
}


export function selectFeel(feel, id) {
	return { type: SELECT_FEEL, feel: feel, id: id }
}

export function updateSelectedFeelDescription(description, feel) {
	return { type: UPDATE_SELECTED_FEEL_DESCRIPTION, description: description, id: feel.id }
}

export function clearSelectedFeel() {
	return { type: CLEAR_SELECTED_FEEL }
}

let feelID = 0;
export function addFeel() {
	return { type: ADD_FEEL, id: feelID++ }
}

