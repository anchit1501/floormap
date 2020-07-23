import React from 'react';
import history from '@history';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Architect from '../../../main/pages/arrchitect/architect';
import * as UserActions from '../../../auth/store/actions/index';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});
const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

export default function ArchitectDialog() {
	const [open, setOpen] = React.useState(false);
	const [sbopen, sbsetOpen] = React.useState(false);
	const Projectdata = useSelector(({ quickPanel }) => quickPanel.data);
	const UserData = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();
	const handleClickOpen = () => {
		setOpen(true);
	};
	const submitData = () => {
		Axios.get('http://localhost:3001/project/')
			.then(resp => {
				let filteredArray = resp.data.filter(item => {
					return parseInt(item.id) === parseInt(Projectdata.id);
				});

				if (filteredArray.length > 0) {
					Axios.put('http://localhost:3001/project/' + Projectdata.id, {
						...filteredArray[0],
						data: Projectdata,
						Completed: true
					}).then(resp => {
						dispatch(UserActions.setProjectsData());
						console.log(resp);
						history.push({
							pathname: '/'
						});
					});
				} else {
					Axios.post('http://localhost:3001/project/', {
						id: Projectdata.id,
						...UserData,
						data: Projectdata,
						Completed: true
					}).then(resp => {
						dispatch(UserActions.setProjectsData());
						console.log(resp);
						history.push({
							pathname: '/'
						});
					});
				}
			})
			.then(resp => {
				console.log(resp);
			});
		console.log(Projectdata);

		handleClose();
		handleClick();
		// dispatch(Actions.toggleQuickPanel());
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseAlert = () => {
		sbsetOpen(false);
	};
	const handleClick = () => {
		sbsetOpen(true);
	};
	return (
		<div>
			<Snackbar open={sbopen} autoHideDuration={6000}>
				<Alert onClose={handleCloseAlert} severity="success">
					Project Submitted Successfully
				</Alert>
			</Snackbar>
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: '10vh', marginLeft: '1vw' }}
				onClick={handleClickOpen}
			>
				Select Architect
			</Button>
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xl">
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Choose An Architect
				</DialogTitle>
				<DialogContent dividers>
					<Architect />
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={() => {
							submitData();
						}}
						color="secondary"
					>
						Submit Project
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
