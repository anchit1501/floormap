import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import TransitionModal from '../../project/modal';

function AnalyticsDashboardApp() {
	const dispatch = useDispatch();
	const widgets = useSelector(({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data);

	useEffect(() => {
		dispatch(Actions.getWidgets());
	}, [dispatch]);

	if (!widgets) {
		return null;
	}
	return (
		<div className="w-full">
			{/* <Widget1 data={widgets.widget1} /> */}

			<TransitionModal />
		</div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
