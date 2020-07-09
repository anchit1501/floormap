import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

function Error404Page() {
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
			window.entryPoint(document.querySelector('#fp-editor-container'), 80949960, settings).then(function (api) {
				window.fpEditor = api;
			});
			//After 1 second, set render to true
		}.bind(this),
		5000
	);

	return (
		<div className="flex flex-col flex-1 items-center justify-center p-16">
			<div className="max-w-512 text-center">
				<FuseAnimate animation="transition.expandIn" delay={100}>
					<Typography variant="h1" color="inherit" className="font-medium mb-16">
						404
					</Typography>
				</FuseAnimate>

				<FuseAnimate delay={500}>
					<Typography variant="h5" color="textSecondary" className="mb-16">
						Sorry but we could not find the page you are looking for
					</Typography>
				</FuseAnimate>

				<Paper className="flex items-center w-full h-56 p-16 mt-48 mb-16" elevation={1}>
					<Icon color="action">search</Icon>
					<Input
						placeholder="Search for anything"
						className="px-16"
						disableUnderline
						fullWidth
						inputProps={{
							'aria-label': 'Search'
						}}
					/>
				</Paper>
				<script src="https://fp-editor-cdn.floorplanner.com/latest.js" crossOrigin="anonymous"></script>
				<div id="fp-editor-container"></div>
				<Link className="font-medium" to="/apps/dashboards/project">
					Go back to dashboard
				</Link>
			</div>
		</div>
	);
}

export default Error404Page;
