import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CustomizedSteppers from '../../project/Stepper.jsx';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.main,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	board: {
		cursor: 'pointer',
		boxShadow: theme.shadows[0],
		transitionProperty: 'box-shadow border-color',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		background: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		'&:hover': {
			boxShadow: theme.shadows[6]
		}
	},
	newBoard: {
		borderWidth: 2,
		borderStyle: 'dashed',
		borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
		'&:hover': {
			borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
		}
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

function Boards(props) {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const dispatch = useDispatch();
	const boards = useSelector(({ scrumboardApp }) => scrumboardApp.boards);

	const classes = useStyles(props);

	useEffect(() => {
		dispatch(Actions.getBoards());
		return () => {
			dispatch(Actions.resetBoards());
		};
	}, [dispatch]);
	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24" style={{margin:'10%'}}>
				<FuseAnimate>
					<Typography variant="h2" className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit">
						Your projects 
					</Typography>
				</FuseAnimate>

				<div>
					
					<div className="flex flex-wrap w-full justify-center py-32 px-16"
							>

						{boards.map(board => (
							<div className="w-224 h-224 p-16" key={board.id} >
								<Link
									to={`/project/${board.id}`}
									className={clsx(
										classes.board,
										'flex flex-col items-center justify-center w-full h-full rounded py-24'
									)}
									role="button"
								>
									<img src={board.thumbnail_3d?board.thumbnail_3d:board.thumbnail}/>
									<Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
										{board.name}
									</Typography>
								</Link>
							</div>
						))}
						<div className="w-224 h-224 p-16">
							<div
								className={clsx(
									classes.board,
									classes.newBoard,
									'flex flex-col items-center justify-center w-full h-full rounded py-24'
								)}
								onClick={handleOpen}
								onKeyDown={() => dispatch(Actions.newBoard())}
								role="button"
								tabIndex={0}
							>
								<Icon className="text-56">add_circle</Icon>
								<Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
									Add new project
								</Typography>
							</div>
						</div>
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
									<CustomizedSteppers />
								</div>
							</Fade>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withReducer('scrumboardApp', reducer)(Boards);
