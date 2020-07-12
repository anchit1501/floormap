import * as Actions from '../actions';

const initialState = {
	state: false,
	data: null
};

const architect = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_ARCHITECT_DATA: {
			return {
				...state,
				data: action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default architect;
