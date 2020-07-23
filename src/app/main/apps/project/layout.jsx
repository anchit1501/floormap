import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as ScrumBoardActions from '../../apps/scrumboard/store/actions';
import Lay from './layout.png';
const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		marginLeft: '2vw',
		marginTop: '70px'
	},
	root1: {
		maxWidth: 345,
		marginLeft: '2vw',
		marginTop: '70px',
		boxShadow: '0 10px 20px 0 rgba(0,0,0,1)'
	},
	media: {
		height: 240
	}
});

export default function LayoutCard() {
	const classes = useStyles();

	const [active, setactive] = React.useState(null);
	const dispatch = useDispatch();

	const handleClick = val => {
		dispatch(ScrumBoardActions.setCurrentProject(val));
	};

	const arr = [82114446];
	return arr.map(value => (
		<Grid key={value} item>
			<Card
				onClick={() => {
					setactive(value);
					handleClick(value);
				}}
				className={active === value ? classes.root1 : classes.root}
			>
				<CardActionArea>
					<CardMedia className={classes.media} image={Lay} title="Contemplative Reptile" />
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Residential Community Layout 1
						</Typography>
						{/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
					</CardContent>
				</CardActionArea>
				<CardActions>
					{/* <Button size="small" color="primary">
          Learn More
        </Button> */}
				</CardActions>
			</Card>
		</Grid>
	));
}
