import React from 'react';

const Error404PageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/project/:id',
			component: React.lazy(() => import('./Error404Page'))
		}
	]
};

export default Error404PageConfig;
