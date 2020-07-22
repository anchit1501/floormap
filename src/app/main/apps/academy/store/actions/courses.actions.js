import axios from 'axios';

export const GET_COURSES = '[ACADEMY APP] GET COURSES';
export const GET_CATEGORIES = '[ACADEMY APP] GET CATEGORIES';

export function getCourses() {
	const request = axios.get('/api/academy-app/courses');
	const request1 = axios.get('http://localhost:3001/project/ ', {
		auth: {
			username: '9d2dc53e34994a7ea8b16b4292dab6cbefcb4cf4',
			password: 'EcbWyhc8.-Jg7@TFmqdqY2uHb'
		}
	});
	//request1.then(response=>res.json(response))
	request1.then(response=>console.log(response))
	//for random status between pending and completed, uncomment below 2 lines 
	//var status = ["pending", "completed"];
	//status[Math.floor(Math.random() * status.length)]
	
	request1.then(response=>response.data.map(response=>Object.assign(response,{activeStep:0, totalSteps:5, status:'pending'})))
	
	return dispatch =>
		request1.then(response =>
			dispatch({
				type: GET_COURSES,
				payload: response.data
			})
		);
}

export function getCategories() {
	const request = axios.get('/api/academy-app/categories');
	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_CATEGORIES,
				payload: response.data
			})
		);
}
