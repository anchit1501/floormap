import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

function Error404Page(props) {
	const id = props.match.params.id
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

	return (
		<div className="flex flex-col flex-1 items-center justify-center p-16">
			<div id="fp-editor-container" style={{ width: '100%', height: '100%', marginTop: '64px' }}></div>
		</div>
	);
}

export default Error404Page;
