import * as Actions from '../actions';

const initialState = {
	state: false,
	data: null,
	importData: null
};

const quickPanel = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_QUICK_PANEL_DATA: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.TOGGLE_QUICK_PANEL: {
			return {
				...state,
				state: !state.state
			};
		}
		case Actions.IMAGE_IMPORT_DATA: {
			return {
				...state,
				importData: action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default quickPanel;
