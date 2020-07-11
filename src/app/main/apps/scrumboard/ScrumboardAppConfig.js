import React from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/dashboard/boards/:boardId/:boardUri?',
			component: React.lazy(() => import('./board/Board'))
		},
		{
			path: '/apps/dashboard/projects',
			component: React.lazy(() => import('./boards/Boards'))
		},
		{
			path: '/apps/dashboard',
			component: () => <Redirect to="/apps/dashboard/projects" />
		}
	]
};

export default ScrumboardAppConfig;
