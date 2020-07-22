import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FuseLoading from '@fuse/core/FuseLoading';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
const ArchitectReportsList = (props) => {
	const classes = useStyles();
	const [project, setProject] = useState([])
	useEffect(()=>{
		fetch('http://localhost:3001/reports/')
			.then(response=>response.json())
			.then(response=>response.filter(res=>res.projectId===props.id).map(res=>{return{id:res.projectId,date:res.date}}))
			.then(response=>setProject(response))
	},[])
	if(project.length===0)
		return <FuseLoading/>
	return(
		<div className={classes.demo} style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'5%'}}>
            <List className={classes.root}>
      			{project.map(report => {
		    		const value = project.indexOf(report)+1;
		    		const {id, date} = report
			        return (
			          	<ListItem key={value} role={undefined} dense button onClick={()=>{}}>
			           		<ListItemAvatar>
			                    <Avatar>
			                      {value}
			                    </Avatar>
			                </ListItemAvatar>
			            	<ListItemText id={value} primary={new Date(date).toDateString()} secondary={new Date(date).toTimeString()} />
				            <ListItemSecondaryAction>
				              <IconButton edge="end" aria-label="comments">
				                <Icon>remove_red_eye</Icon>
				              </IconButton>
				            </ListItemSecondaryAction>
			          	</ListItem>
			        );
      			})}
    		</List>
          </div>
	)
}

export default ArchitectReportsList