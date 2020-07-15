import React from 'react';
import { Redirect } from 'react-router-dom';

const AcademyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/academy/courses/:courseId/:courseHandle?',
			component: React.lazy(() => import('./course/Course'))
		},
		{
			path: '/apps/architect/projects',
			component: React.lazy(() => import('./courses/Courses'))
		},
		{
			path: '/apps/architect',
			component: () => <Redirect to="/apps/architect/projects" />
		}
	]
};

export default AcademyAppConfig;
