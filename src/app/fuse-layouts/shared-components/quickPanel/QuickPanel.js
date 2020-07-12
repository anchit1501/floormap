import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import withReducer from 'app/store/withReducer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions/index';
import reducer from './store/reducers';

const useStyles = makeStyles(theme => ({
	root: {
		width: 280
	}
}));

function QuickPanel(props) {
	const dispatch = useDispatch();
	const data = useSelector(({ quickPanel }) => quickPanel.data);
	const state = useSelector(({ quickPanel }) => quickPanel.state);
	console.log(data);
	const classes = useStyles();
	const [checked, setChecked] = useState('notifications');
	const noOfWindows = data
		? data.project.floors[0].floor[0].designs[0].design[0].objects[0].object.filter(item => item.type === 'val')
				.length
		: '';
	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	useEffect(() => {
		dispatch(Actions.getQuickPanelData());
	}, [dispatch]);

	return (
		<Drawer
			classes={{ paper: classes.root }}
			open={state}
			anchor="right"
			onClose={ev => dispatch(Actions.toggleQuickPanel())}
		>
			<FuseScrollbars>
				<ListSubheader component="div">{data ? data.project.name[0] : 0}</ListSubheader>
				<Divider />
				<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={classes.heading}>
							{data ? data.project.floors[0].floor[0].designs[0].design[0].areas[0].area[0].name : ''}{' '}
							Area
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography className={classes.heading}>
							Number of Windows :{' '}
							{data
								? data.project.floors[0].floor[0].designs[0].design[0].objects[0].object.filter(
										item => item.type[0] === 'window'
								  ).length
								: ''}
						</Typography>
					</ExpansionPanelDetails>
					<ExpansionPanelDetails>
						<Typography className={classes.heading}>
							No.of Doors:
							{data
								? data.project.floors[0].floor[0].designs[0].design[0].objects[0].object.filter(
										item => item.type[0] === 'door'
								  ).length
								: ''}
						</Typography>
					</ExpansionPanelDetails>
					<ExpansionPanel>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2a-content"
							id="panel2a-header"
						>
							<Typography className={classes.heading}>Walls</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography>
								No.of Walls:
								{data ? data.project.floors[0].floor[0].designs[0].design[0].lines[0].line.length : ''}
							</Typography>
						</ExpansionPanelDetails>
						<ExpansionPanelDetails>
							<Typography>
								Hieght of wall:
								{data ? data.project.floors[0].floor[0].height[0]._ : ''}
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</ExpansionPanel>
				<Button variant="contained" color="primary">
					Primary
				</Button>
			</FuseScrollbars>
		</Drawer>
	);
}
export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
