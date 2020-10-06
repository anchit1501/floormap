import axios from 'axios';
import xml2js from 'xml2js';
import history from '@history';

export const TOGGLE_QUICK_PANEL = '[QUICK PANEL] TOGGLE QUICK PANEL';
export const GET_QUICK_PANEL_DATA = '[QUICK PANEL] GET DATA';
export const IMAGE_IMPORT_DATA = '[QUICK PANEL] IMPORT DATA';

var TotalSum = 0;
export function getQuickPanelData() {
	if (window.fpEditor) {
		const id = window.fpEditor.project.id;
		const request = axios.get('https://floorplanner.com/api/v2/projects/' + id + '/download.json', {
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
				TotalSum = 0;
				var Obj = {
					id: fpData.project.id[0]._,
					name: fpData.project.name[0],
					floors: {
						TotalFloors: fpData.project.floors[0].floor.length,
						floor: getFloor(fpData.project.floors[0].floor)
					},
					Sum: TotalSum
				};
				dispatch({
					type: GET_QUICK_PANEL_DATA,
					payload: Obj
				});
			});
	} else {
		return dispatch =>
			dispatch({
				type: GET_QUICK_PANEL_DATA,
				payload: null
			});
	}
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
		if (item.points[0].split(',').length === 4) {
			tempArr.push({
				name: item.name,
				point: getArea(item.points[0]),
				material: item.asset ? item.asset[0].$.refid : null
			});
			TotalSum = TotalSum + (getArea(item.points[0]).area ? getArea(item.points[0]).area.toFixed(2) * 15 : 0);
		}
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
			length: getlength(item.points[0].split(',')[0]),
			left: item.left ? item.left[0].$.refid : null,
			right: item.right ? item.right[0].$.refid : null
		});
		TotalSum =
			TotalSum +
			(parseFloat(val.height[0]._) * parseFloat(getlength(item.points[0].split(',')[0]))).toFixed(2) * 10;
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
		tempArr.push({
			name: item.type ? item.type[0] : '',
			area: item.points ? item.points[0] : '',
			size: item.size ? item.size[0] : ''
		});
	});
	return tempArr;
}

function getArea(val) {
	let temparr = val.split(',');
	let arr1 = temparr[0].split(' ');
	let arr2 = temparr[1].split(' ');
	let arr3 = temparr[2].split(' ');

	if (arr1[0] === arr2[0]) {
		return {
			length: getlength(temparr[0]),
			width: getlength(temparr[1]),
			area: parseFloat(getlength(temparr[0])) * parseFloat(getlength(temparr[1]))
		};
	} else if (arr1[0] === arr3[0]) {
		return {
			length: getlength(temparr[0]),
			width: getlength(temparr[2]),
			area: parseFloat(getlength(temparr[0])) * parseFloat(getlength(temparr[2]))
		};
	} else {
		return {
			length: getlength(temparr[0]),
			width: getlength(temparr[3]),
			area: parseFloat(getlength(temparr[0])) * parseFloat(getlength(temparr[3]))
		};
	}
	// return {};
	// let tempArr = [];
	// val.map(item => {
	// 	tempArr.push({ name: item.type[0], area: getAreas(), size: item.size[0] });
	// });
}

export function getExportData() {
	if (window.fpEditor) {
		const id = window.fpEditor.project.id;
		const request = axios.get('https://floorplanner.com/api/v2/exports.json', {
			auth: {
				username: '9d2dc53e34994a7ea8b16b4292dab6cbefcb4cf4',
				password: 'EcbWyhc8.-Jg7@TFmqdqY2uHb'
			}
		});

		return dispatch =>
			request.then(response => {
				console.log(response);
				const filteredArray = response.data.filter(
					item => parseInt(item.project_id) === parseInt(id) && item.fmt === 'jpg'
				);
				console.log(filteredArray);
				let ImageArray = [];
				filteredArray.map(item => {
					let timeStamp = item.created_at;
					console.log(item.result);
					let x = item.result && item.result.design ? Object.values(item.result.design) : [];
					x.map(item => {
						ImageArray.push({ img: item[0], time: timeStamp });
					});
				});
				console.log(ImageArray);
				dispatch({
					type: IMAGE_IMPORT_DATA,
					payload: ImageArray
				});
			});
	} else {
		return dispatch =>
			dispatch({
				type: IMAGE_IMPORT_DATA,
				payload: null
			});
	}
}
export function toggleQuickPanel() {
	return {
		type: TOGGLE_QUICK_PANEL
	};
}
