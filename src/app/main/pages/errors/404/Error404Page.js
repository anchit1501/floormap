import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import Axios from 'axios';
import FuseLoading from '@fuse/core/FuseLoading';

const hist = createBrowserHistory();
function Error404Page(props) {
	const id = props.match.params.id;
	Axios.get('http://localhost:3001/project/').then(resp => {
		let filteredArray = resp.data.filter(item => {
			return parseInt(item.id) === parseInt(id);
		});

		if (filteredArray.length === 0) {
			Axios.post('http://localhost:3001/project/', {
				id: id,
				plot: localStorage.getItem('Plot'),
				city: localStorage.getItem('city'),
				Completed: false
			}).then(resp => {
				console.log(resp);
			});
		}
	});
	setTimeout(
		function () {
			//Start the timer
			console.log(window.entryPoint);
			if (window.entryPoint) {
				clearInterval();
			}
			var settings = {
				user: {
					id: 58438812,
					permissions: ['save'],
					auth_token:
						'eyJhbGciOiJIUzI1NiJ9.eyJhY3Rpb24iOiJsb2dpbiIsIm1vZGVsIjoiVXNlciIsImlkIjo1ODQzODgxMiwiaWF0IjoxNTkzNzIwMjM5fQ.tr33Dd4b3vQ4x7BfdV1ZXqszVjXiMVHbbFC8rs3ak_c'
				}
			};

			// the entryPoint function returns a Promise, which is resolved with the 'editor API' object
			window.entryPoint(document.querySelector('#fp-editor-container'), id, settings).then(function (api) {
				window.fpEditor = api;
			});
			//After 1 second, set render to true
		}.bind(this),
		3000
	);
	useEffect(() => {
		let navbar = document.querySelector('#fuse-navbar');
		navbar.style.display = 'none';

		return () => {
			navbar.style.display = 'block';
		};
	}, []);
	return (
		<div className="flex flex-col flex-1 items-center justify-center ">
			<FuseLoading />
			<div id="fp-editor-container" style={{ width: '100%', height: '100%', marginTop: '36px' }}>
				Loading....
			</div>
		</div>
	);
}

export default Error404Page;
