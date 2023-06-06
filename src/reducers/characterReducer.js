// Reducers are just functions, they are not tied to any components


export const characterReducer = (previousState, instructions) => {
	let stateEditable = {...previousState};

	switch (instructions.type){
		case "setup":
			// apply local storage data to state

			// returning = setting it as state
			return instructions.data;

		case "receiveDamage":

			// expect instructions.data to include how much damage we take

			stateEditable.health -= instructions.data;

			return stateEditable;

		case "spendStamina":

			// assume that you only spend stamina on attacking
			// so, extra logic needed for other stamina-costing actions
			stateEditable.stamina -= stateEditable.attackCost;

			return stateEditable;

		default:
			return stateEditable;
	}
}