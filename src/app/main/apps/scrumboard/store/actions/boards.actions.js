import history from '@history';
import axios from 'axios';
import BoardModel from '../../model/BoardModel';

export const GET_BOARDS = '[SCRUMBOARD APP] GET BOARDS';
export const RESET_BOARDS = '[SCRUMBOARD APP] RESET BOARDS';
export const NEW_BOARD = '[SCRUMBOARD APP] NEW BOARD';
export const GET_PROJECTS = '[SCRUMBOARD APP] NEW BOARD';

export function getBoards() {
	const request1 = axios.get('https://floorplanner.com/api/v2/projects/search.json ', {
		auth: {
			username: '9d2dc53e34994a7ea8b16b4292dab6cbefcb4cf4',
			password: 'EcbWyhc8.-Jg7@TFmqdqY2uHb'
		}
	});
	request1.then(response => console.log(response));
	const request = axios.get('/api/scrumboard-app/boards');
	return dispatch =>
		request1.then(response =>
			dispatch({
				type: GET_BOARDS,
				payload: response.data.results
			})
		);
}

export function resetBoards() {
	return {
		type: RESET_BOARDS
	};
}

export function newBoard(board) {
	const request = axios.post('/api/scrumboard-app/board/new', {
		board: board || new BoardModel()
	});

	return dispatch =>
		request.then(response => {
			const _board = response.data;
			history.push({
				pathname: `/apps/dashboard/boards/${_board.id}/${_board.handle}`
			});
			return dispatch({
				type: NEW_BOARD,
				board: _board
			});
		});
}
