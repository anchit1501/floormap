import axios from 'axios';
export const GET_ARCHITECT_DATA = 'GET_ARCHITECT_DATA';

export function getArchitectData() {
	const request = axios.get('/api/architect/about');
	return dispatch =>
		request.then(response => {
			dispatch({
				type: GET_ARCHITECT_DATA,
				payload: response.data
			});
		});
}
