import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as UserActions from '../../../../app/auth/store/actions';
import * as Actions from './store/actions/index';
import reducer from './store/reducers';
const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 270,
		marginLeft: '2vw',
		marginTop: '70px'
	},
	root1: {
		maxWidth: 270,
		marginLeft: '2vw',
		marginTop: '70px',
		boxShadow: '0 4px 20px 0 rgba(0,0,0,1)'
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

function Architect() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const dispatch = useDispatch();
	const architectData = useSelector(({ architect }) => architect.data);
	const [active, setactive] = React.useState(null);
	// const handleExpandClick = () => {
	// 	console.log(expanded);
	// 	setExpanded(!expanded);
	// };

	const handleClick = id => {
		dispatch(UserActions.setProjectArchitect(id));
	};
	useEffect(() => {
		dispatch(Actions.getArchitectData());
	}, [dispatch]);

	return (
		<div>
			<Grid item xs={12}>
				<Grid container justify="center" spacing={2}>
					{architectData
						? architectData.map((value, i) => (
								<Grid key={i} item>
									<Card
										onClick={() => {
											setactive(i);
											handleClick(value.id);
										}}
										key={i}
										className={active === i ? classes.root1 : classes.root}
									>
										<CardHeader
											avatar={
												<Avatar aria-label="recipe" className={classes.avatar}>
													A
												</Avatar>
											}
											title={value.first_name + ' ' + value.last_name}
											subheader={value.position}
										/>
										<CardMedia
											className={classes.media}
											image={value.avatar}
											title={value.first_name + ' ' + value.last_name}
										/>
										<CardContent>
											<Typography variant="body2" color="textSecondary" component="p">
												Email :{value.email}
											</Typography>
											<Typography variant="body2" color="textSecondary" component="p">
												Mobile :{value.address}
											</Typography>
										</CardContent>
										<CardActions disableSpacing></CardActions>
										<Collapse in={expanded} timeout="auto" unmountOnExit>
											<CardContent>
												<Typography paragraph>Method:</Typography>
												<Typography paragraph>
													Heat 1/2 cup of the broth in a pot until simmering, add saffron and
													set aside for 10 minutes.
												</Typography>
												<Typography paragraph>
													Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
													over medium-high heat. Add chicken, shrimp and chorizo, and cook,
													stirring occasionally until lightly browned, 6 to 8 minutes.
													Transfer shrimp to a large plate and set aside, leaving chicken and
													chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
													onion, salt and pepper, and cook, stirring often until thickened and
													fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
													cups chicken broth; bring to a boil.
												</Typography>
												<Typography paragraph>
													Add rice and stir very gently to distribute. Top with artichokes and
													peppers, and cook without stirring, until most of the liquid is
													absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
													shrimp and mussels, tucking them down into the rice, and cook again
													without stirring, until mussels have opened and rice is just tender,
													5 to 7 minutes more. (Discard any mussels that don’t open.)
												</Typography>
												<Typography>
													Set aside off of the heat to let rest for 10 minutes, and then
													serve.
												</Typography>
											</CardContent>
										</Collapse>
									</Card>
								</Grid>
						  ))
						: ''}
				</Grid>
			</Grid>
		</div>
	);
}

export default withReducer('architect', reducer)(React.memo(Architect));
