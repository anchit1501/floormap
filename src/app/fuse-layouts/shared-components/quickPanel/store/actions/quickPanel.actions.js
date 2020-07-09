import axios from 'axios';
import xml2js from 'xml2js';
export const TOGGLE_QUICK_PANEL = '[QUICK PANEL] TOGGLE QUICK PANEL';
export const GET_QUICK_PANEL_DATA = '[QUICK PANEL] GET DATA';

export function getQuickPanelData() {
	const request = axios.get('https://floorplanner.com/api/v2/projects/80949960/download.json', {
		auth: {
			username: '9d2dc53e34994a7ea8b16b4292dab6cbefcb4cf4',
			password: 'EcbWyhc8.-Jg7@TFmqdqY2uHb'
		}
	});
	const parser = new xml2js.Parser();
	var fpData = {};

	return dispatch =>
		request.then(response => {
			parser.parseString(response.data, function (err, result) {
				fpData = result;
			});
			dispatch({
				type: GET_QUICK_PANEL_DATA,
				payload: fpData
			});
		});
}

export function toggleQuickPanel() {
	return {
		type: TOGGLE_QUICK_PANEL
	};
}
