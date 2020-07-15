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
import ProjectSteppers from '../../project/ProjectStepper.jsx';

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
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
				return item.name.toLowerCase().includes(searchText.toLowerCase());
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
			<Modal
							aria-labelledby="transition-modal-title"
							aria-describedby="transition-modal-description"
							className={classes.modal}
							open={open}
							onClose={handleClose}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500
							}}
						>
							<Fade in={open}>
								<div className={classes.paper}>
									<ProjectSteppers />
								</div>
							</Fade>
						</Modal>
			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-24 sm:text-40 font-light">
						WELCOME TO YOUR WORLD OF ARCHITECTURE!
					</Typography>
				</FuseAnimate>
				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
						<span className="opacity-75">
							The dashboard will help you through the process of tracking your new and existing projects. It also lets you track and update the progress of your projects.
						</span>
					</Typography>
				</FuseAnimate>
				<Icon className={classes.headerIcon}> school </Icon>
			</div>
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
														{course.name}
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
														onClick={handleOpen}
														className="justify-start px-32"
														color="secondary"
													>
														{buttonStatus(course)}
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
