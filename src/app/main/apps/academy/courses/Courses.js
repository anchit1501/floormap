import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ArchitectForm from '../../project/ArchitectForm';
import ArchitectReportsList from '../../project/ArchitectReportsList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: '95vh',
		width: '90vw',
		overflow: 'scroll'
	}
}));

function Courses(props) {
	const [open, setOpen] = useState(false);
	const [currentProject, setCurrentProject] = useState('');
	const [showReportDialog, setShowReportDialog] = useState(false);

	const handleOpen = (id,event) => {
		event.preventDefault()
		setCurrentProject(id)
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpenReports=(id, event)=> {
		event.preventDefault();
		setCurrentProject(id)
		setShowReportDialog(true)
	}

	const handleCloseReports = () => {
		setShowReportDialog(false);
	};

	const dispatch = useDispatch();
	const courses = useSelector(({ academyApp }) => academyApp.courses.data);
	const categories = useSelector(({ academyApp }) => academyApp.courses.categories);

	const classes = useStyles(props);
	const theme = useTheme();
	const [filteredData, setFilteredData] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	useEffect(() => {
		dispatch(Actions.getCategories());
		dispatch(Actions.getCourses());
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0 && selectedCategory === 'all') {
				return courses;
			}

			return _.filter(courses, item => {
				if (selectedCategory !== 'all' && item.status !== selectedCategory) {
					return false;
				}
				return item.data.name.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (courses) {
			setFilteredData(getFilteredArray());
		}
	}, [courses, searchText, selectedCategory]);

	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	function buttonStatus(course) {
		switch (course.activeStep) {
			case course.totalSteps:
				return 'COMPLETED';
			case 0:
				return 'START';
			default:
				return 'CONTINUE';
		}
	}
	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
		        <AppBar className={classes.appBar}>
		         	<Toolbar className="flex justify-between">
			            <Button edge="end" color="inherit">
			              Project ID : {currentProject}
			            </Button>
			            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
			              <CloseIcon />
			            </IconButton>
			        </Toolbar>
		        </AppBar>
		        <ArchitectForm id={currentProject} handleClose={handleClose}/>
		    </Dialog>
		    <Dialog fullScreen open={showReportDialog} onClose={handleCloseReports} TransitionComponent={Transition}>
		        <AppBar className={classes.appBar}>
		         	<Toolbar className="flex justify-between">
			            <Button edge="end" color="inherit">
			              Project ID : {currentProject}
			            </Button>
			            <IconButton edge="end" color="inherit" onClick={handleCloseReports} aria-label="close">
			              <CloseIcon />
			            </IconButton>
		          	</Toolbar>
		        </AppBar>
		        <ArchitectReportsList id={currentProject} />
		    </Dialog>
			<div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
				<div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
					<TextField
						label="Search for a project"
						placeholder="Enter a keyword..."
						className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={handleSearchText}
						variant="outlined"
						InputLabelProps={{
							shrink: true
						}}
					/>
					<FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
						<InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
						<Select
							value={selectedCategory}
							onChange={handleSelectedCategory}
							input={
								<OutlinedInput
									labelWidth={'category'.length * 9}
									name="category"
									id="category-label-placeholder"
								/>
							}
						>
							<MenuItem value="all">
								<em> All </em>
							</MenuItem>
							{categories.map(category => (
								<MenuItem value={category.value} key={category.id}>
									{category.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				{useMemo(
					() =>
						filteredData &&
						(filteredData.length > 0 ? (
							<FuseAnimateGroup
								enter={{
									animation: 'transition.slideUpBigIn'
								}}
								className="flex flex-wrap py-24"
							>
								{filteredData.map(course => {
									const category = categories.find(_cat => _cat.value === course.status);
									return (
										<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.id}>
											<Card elevation={1} className="flex flex-col h-256">
												<div
													className="flex flex-shrink-0 items-center justify-between px-24 h-64"
													style={{
														background: category.color,
														color: theme.palette.getContrastText(category.color)
													}}
												>
													<Typography className="font-medium truncate" color="inherit">
														{course.data.name}
													</Typography>
													<div className="flex items-center justify-center opacity-75">
														<div className="text-16 whitespace-no-wrap">
															{category.label}
															
														</div>
													</div>
												</div>
												<CardContent className="flex flex-col flex-auto items-center justify-center" style={{background:`url(${course.thumbnail_3d?course.thumbnail_3d:course.thumbnail})`, backgroundSize:'cover'}}>
												</CardContent>
												<Divider />
												<CardActions className="justify-center">
													<Button
														onClick={handleOpen.bind(this,course.id)}
														className="justify-start px-32"
														color="secondary"
													>
														{buttonStatus(course)}
													</Button>
													<Button
														onClick={handleOpenReports.bind(this,course.id)}
														className="justify-start px-32"
														color="secondary"
													>
														View Reports
													</Button>
												</CardActions>
												<LinearProgress
													className="w-full"
													variant="determinate"
													value={(course.activeStep * 100) / course.totalSteps}
													color="secondary"
												/>
											</Card>
										</div>
									);
								})}
							</FuseAnimateGroup>
						) : (
							<div className="flex flex-1 items-center justify-center">
								<Typography color="textSecondary" className="text-24 my-24">
									No courses found!
								</Typography>
							</div>
						)),
					[categories, filteredData, theme.palette]
				)}
			</div>
		</div>
	);
}

export default withReducer('academyApp', reducer)(Courses);
