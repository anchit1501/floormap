import React from 'react';

const ArchitectConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/architect',
			component: React.lazy(() => import('./architect'))
		}
	]
};

export default ArchitectConfig;
