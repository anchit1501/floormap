import React from 'react';

const FaqPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/reports/:id',
			component: React.lazy(() => import('./FaqPage'))
		}
	]
};

export default FaqPageConfig;
