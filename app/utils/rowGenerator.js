// basically have to take `feels` state object and combine it with buttons and return an array
// in a format that ListView / Swipeout can understand


var btnsDefault = [ { text: 'Button' } ]
var btnsTypes = [
  { text: 'Edit',    type: 'primary',   },
  { text: 'Delete',     type: 'delete',    }
]

export default function rowGenerator(arr) {
	let output = [];
	if (!Array.isArray(arr)) {
		arr = Object.keys(arr).map(key => arr[key])
	}
	for (let i = arr.length - 2; i >= 0; i--) {
		let emoji = arr[i].type;
		let text = arr[i].description === undefined ? 
			"" :
			arr[i].description;

		output.push(
			{ 
				text: emoji + ' ' + text,
				right: btnsTypes
			}
		)
	}
	return output;
}