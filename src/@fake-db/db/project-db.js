import _ from '@lodash';

import mock from '../mock';
/* eslint-disable camelcase */

const projectDB = {
	Project: []
};

// mock.onGet('/api/Project/getDetails').reply(config => {
// 	const data = JSON.parse(projectDB.Project);
// 	return [200, data];
// });

mock.onPost('/api/Project/addDetails').reply(config => {
	const data = JSON.parse(config.data);

	const { user } = data;
	projectDB.Project = projectDB.Project.map(_user => {
		return _.merge(_user, user);
	});
	return [200, 'success'];
});
