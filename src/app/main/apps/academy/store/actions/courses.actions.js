import axios from 'axios';

export const GET_COURSES = '[ACADEMY APP] GET COURSES';
export const GET_CATEGORIES = '[ACADEMY APP] GET CATEGORIES';

export function getCourses() {
	const request = axios.get('/api/academy-app/courses');
	const request1 = axios.get('https://floorplanner.com/api/v2/projects/search.json ', {
		auth: {
			username: '9d2dc53e34994a7ea8b16b4292dab6cbefcb4cf4',
			password: 'EcbWyhc8.-Jg7@TFmqdqY2uHb'
		}
	});
	var status = ["pending", "completed"];
	request1.then(response=>response.data.results.map(response=>Object.assign(response,{activeStep:0, totalSteps:5, status:status[Math.floor(Math.random() * status.length)]})))
	request1.then(response=>console.log(response))

	return dispatch =>
		request1.then(response =>
			dispatch({
				type: GET_COURSES,
				payload: response.data.results
			})
		);
}

export function getCategories() {
	const request = axios.get('/api/academy-app/categories');
	request.then(response=>console.log(response.data))
	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_CATEGORIES,
				payload: response.data
			})
		);
}
