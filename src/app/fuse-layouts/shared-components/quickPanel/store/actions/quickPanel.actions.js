import axios from 'axios';
import xml2js from 'xml2js';
export const TOGGLE_QUICK_PANEL = '[QUICK PANEL] TOGGLE QUICK PANEL';
export const GET_QUICK_PANEL_DATA = '[QUICK PANEL] GET DATA';

export function getQuickPanelData() {
	const request = axios.get('https://floorplanner.com/api/v2/projects/81476919/download.json', {
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
			var Obj = {
				id: fpData.project.id[0]._,
				name: fpData.project.name[0],
				floors: {
					TotalFloors: fpData.project.floors[0].floor.length,
					floor: getFloor(fpData.project.floors[0].floor)
				}
			};
			console.log(Obj);
			axios.post('/api/Project/addDetails', { Obj }).then(rep => {
				console.log(rep);
			});
			// axios.get('/api/Project/getDetails', { Obj }).then(rep => {
			// 	console.log(rep);
			// });
			dispatch({
				type: GET_QUICK_PANEL_DATA,
				payload: Obj
			});
		});
}

function getFloor(val) {
	let tempArr = [];
	val.map(item => {
		tempArr.push({
			name: item.name[0],
			area: getAreas(item.designs[0].design[0].areas[0].area),
			walls: getwalls(item),
			Objects: getObjects(item.designs[0].design[0].objects[0].object)
		});
	});
	return tempArr;
}

function getAreas(val) {
	let tempArr = [];
	val.map(item => {
		tempArr.push({ name: item.name, point: item.points[0] });
	});
	return tempArr;
}

function getwalls(val) {
	let val1 = val.designs[0].design[0].lines[0].line;
	let tempArr = [];
	val1.map(item => {
		tempArr.push({
			thickness: item.thickness[0],
			height: val.height[0]._,
			length: getlength(item.points[0].split(',')[0])
		});
	});
	return tempArr;
}

function getlength(val) {
	const tempArr = val.split(' ');
	for (let i = 0; i <= 3; i++) {
		if (parseFloat(tempArr[i + 3]) - parseFloat(tempArr[i]) != 0) {
			return Math.abs(parseFloat(tempArr[i + 3]) - parseFloat(tempArr[i])).toFixed(2);
		}
	}
	return 0;
}

function getObjects(val) {
	let tempArr = [];
	val.map(item => {
		tempArr.push({ name: item.type[0], point: item.points[0], size: item.size[0] });
	});
	return tempArr;
}

export function toggleQuickPanel() {
	return {
		type: TOGGLE_QUICK_PANEL
	};
}
