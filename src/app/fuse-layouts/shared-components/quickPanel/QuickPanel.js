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
import { createBrowserHistory } from 'history';
import ArchitectDialog from './ArchitectDialog';
const hist = createBrowserHistory();

const useStyles = makeStyles(theme => ({
	root: {
		width: 280
	}
}));

function QuickPanel(props) {
	console.log(props);
	const dispatch = useDispatch();
	const data = useSelector(({ quickPanel }) => quickPanel.data);
	const state = useSelector(({ quickPanel }) => quickPanel.state);
	console.log(data);
	const classes = useStyles();
	const [checked, setChecked] = useState('notifications');
	// const noOfWindows = data
	// 	? data.project.floors[0].floor[0].designs[0].design[0].objects[0].object.filter(item => item.type === 'val')
	// 			.length
	// 	: '';
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
			onClose={ev => {
				dispatch(Actions.toggleQuickPanel());
			}}
		>
			<FuseScrollbars>
				<Typography className={classes.heading}>{data ? data.name + ',(' + data.Sum + ')USD' : ''}</Typography>
				<Divider />
				{data
					? data.floors.floor.map(floor => (
							<ExpansionPanel>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>{floor.name}</Typography>
								</ExpansionPanelSummary>

								{floor.area
									? floor.area.map((area, i) => (
											<ExpansionPanel>
												<ExpansionPanelSummary
													expandIcon={<ExpandMoreIcon />}
													aria-controls="panel1a-content"
													id="panel1a-header"
												>
													<Typography className={classes.heading}>
														{area.name ? area.name[0] : 'Area ' + (i + 1)}
													</Typography>
												</ExpansionPanelSummary>
												<ExpansionPanelDetails>
													<Typography>Length : {area.point.length} M</Typography>
												</ExpansionPanelDetails>
												<ExpansionPanelDetails>
													<Typography>Width : {area.point.width} M</Typography>
												</ExpansionPanelDetails>
												<ExpansionPanelDetails>
													<Typography>Area : {area.point.area.toFixed(2)} SQM</Typography>
												</ExpansionPanelDetails>

												<ExpansionPanelDetails>
													<Typography>
														{' '}
														Material : {area.material ? area.material : 'Default'}{' '}
													</Typography>
												</ExpansionPanelDetails>

												<ExpansionPanelDetails>
													<Typography>
														Amount : {(area.point.area * 15).toFixed(2)} USD
													</Typography>
												</ExpansionPanelDetails>
											</ExpansionPanel>
									  ))
									: ''}
								<ExpansionPanel>
									<ExpansionPanelSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography className={classes.heading}>Walls</Typography>
									</ExpansionPanelSummary>

									{floor.walls
										? floor.walls.map((wall, i) => (
												<ExpansionPanel>
													<ExpansionPanelSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls="panel1a-content"
														id="panel1a-header"
													>
														<Typography className={classes.heading}>
															WAll {i + 1} {', '}
															{(
																parseFloat(wall.height).toFixed(2) *
																parseFloat(wall.length).toFixed(2) *
																10
															).toFixed(2)}{' '}
															USD
														</Typography>
													</ExpansionPanelSummary>
													<ExpansionPanelDetails>
														<Typography>Height : {wall.height} M</Typography>
													</ExpansionPanelDetails>
													<ExpansionPanelDetails>
														<Typography>length : {wall.length} M</Typography>
													</ExpansionPanelDetails>
													<ExpansionPanelDetails>
														<Typography>
															Thickness : {parseFloat(wall.thickness).toFixed(2)} M
														</Typography>
													</ExpansionPanelDetails>
													<ExpansionPanelDetails>
														<Typography>
															Area :{' '}
															{(
																parseFloat(wall.height) * parseFloat(wall.length)
															).toFixed(2)}{' '}
															SQM
														</Typography>
													</ExpansionPanelDetails>
													{wall.left ? (
														<ExpansionPanelDetails>
															<Typography>Outer Material : {wall.left} </Typography>
														</ExpansionPanelDetails>
													) : (
														''
													)}
													{wall.right ? (
														<ExpansionPanelDetails>
															<Typography>Inner Material : {wall.right} </Typography>
														</ExpansionPanelDetails>
													) : (
														''
													)}
													<ExpansionPanelDetails>
														<Typography>
															Amount :{' '}
															{(
																parseFloat(wall.height).toFixed(2) *
																parseFloat(wall.length).toFixed(2) *
																10
															).toFixed(2)}{' '}
															USD
														</Typography>
													</ExpansionPanelDetails>
												</ExpansionPanel>
										  ))
										: ''}
								</ExpansionPanel>
								<ExpansionPanelDetails>
									<Typography className={classes.heading}>
										No. OF Windows : {floor.Objects.filter(item => item.name === 'window').length}
									</Typography>
								</ExpansionPanelDetails>
								<ExpansionPanelDetails>
									<Typography className={classes.heading}>
										No. OF Doors : {floor.Objects.filter(item => item.name === 'door').length}
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
					  ))
					: 'Loading... '}
				{data ? <ArchitectDialog /> : ''}
			</FuseScrollbars>
		</Drawer>
	);
}
export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
