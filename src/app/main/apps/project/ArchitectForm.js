import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseLoading from '@fuse/core/FuseLoading';
//import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
//import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
//import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState, useReducer } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//import * as Actions from '../e-commerce/store/actions';
//import reducer from '../e-commerce/store/reducers';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTable } from 'react-table';
import printJS from 'print-js'
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}
function Table({ columns, data, updateMyData }) {
		// Use the state and functions returned from useTable to build your UI
	const { getTableProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
		defaultColumn,
		updateMyData
	});
	// Render the UI for your table
	return (
		<MaUTable {...getTableProps()}>
			<TableHead>
				{headerGroups.map(headerGroup => (
					<TableRow {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
						))}
					</TableRow>
				))}
			</TableHead>
			<TableBody>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<TableRow {...row.getRowProps()}>
							{row.cells.map(cell => {
								return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
							})}
						</TableRow>
					);
				})}
			</TableBody>
		</MaUTable>
	);
}

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));
const rows = [
	{
		id : 'Internal Plastering',
	},
	{
		id : 'Internal Painting',
	},
	{
		id : 'Ceramic Tiles Dry Areas',
	},
	{
		id : 'Ceramic Tiles Wet Areas',
	},
	{
		id : 'Staircase Work',
	},
	{
		id : 'Marble Counter Tops',
	},
	{
		id : 'Rolling Shutter Doors',
	},
	{
		id : 'Wooden Doors',
	},
	{
		id : 'Aluminuin Works',
	},
	{
		id : 'Metal Works',
	},
	{
		id : 'Sanitary Fixture',
	},
	{
		id : 'Interlock Tiles',
	}
	
]
function ArchitectForm(props) {
	
	const classes = useStyles(props);
	
	const [tableData, setTableData] = useState([])
	const [column, setColumn] = useState([])
	const [floorWiseImages, setFloorWiseImages] = useState([])
	const [tabs, setTabs] = useState([])
	const [tabValue, tabDisptacher] = useReducer(reducer, 0)
	const [open, setOpen] = useState(false);
	const [caption, setCaption] = useState('')
	const [isCaptionSubmitted, setIsCaptionSubmitted] = useState(false)
	const [file, setFile] = useState()
	const [alertStatus, setAlertStatus] = useState(false)
	const [comments, setComments] = useState([])

	const handleCaptionChange = (e) => {
		setCaption(e.target.value)
	}
	const submitCaption = () => {
		setIsCaptionSubmitted(!isCaptionSubmitted)
		handleUploadChange(file)
		handleClose()
	}
	const handleClickOpen = (e) => {
		setOpen(true);
		setFile(e.target.files[0])
	};

	const handleClose = () => {
		setIsCaptionSubmitted(!isCaptionSubmitted)
		setCaption('')
	    setOpen(false);
	};

  	function reducer(state, action) {
	  switch (action.type) {
	    case 'setTabValue':
	      return action.value;
	    default:
	      throw new Error();
	  }
	}
  	const fillArray = (value, len) =>{
				  var arr = [];
				  for (var i = 0; i < len; i++) {
				    arr.push(value);
				  }
				  return arr;
	}
	const handleCommentChange = (e) => {
		let newcomment = e.target.value
		let newarr = comments.map((comment, index)=>{
			if(index===tabValue)
				return newcomment
			else
				return comment
		})
		setComments(newarr)
	}
	useEffect(()=>{
		(async () =>{
			var matchId = props.id
			fetch('http://localhost:3001/reports/')
			.then(response=>response.json())
			.then(response=>response.filter(res=>res.projectId===props.id))
			.then(response=>{
				//if reports for the project already exists
				if(response.length>0){
					//fetching report whose id is maximum - meaning the one which was entered last time 
					let lastestReportId = (Math.max.apply(Math, response.map(function(o) { return o.id; })))
					let report = response.filter(response=>response.id===lastestReportId)
					const {floors, rows, columns, floorWiseImages, comments } = report[0]
					setTabs(floors)
					setTableData(rows)
					setColumn(columns)
					setFloorWiseImages(floorWiseImages)
					setComments(comments)
				}
				else{
					fetch('http://localhost:3001/project/')
					.then(response=>response.json())
					.then(response=>response.filter(res=>res.id===matchId))
					.then(res=>{
						let floor = res[0].data.floors.floor
						setTabs(floor.map(floor=>floor.name))
					
						let floorWiseData = []
						for(var i=0; i<floor.length; i++){
							let totalEntities = (floor[i].area)
							let midResult = [{Header: '', accessor:'id'}]
							totalEntities.map(entity=>{
								if(entity.hasOwnProperty('name'))
									midResult.push({
										Header:entity.name[0],
										accessor:entity.name[0]
									})
								else{
									let accessor = `Floor${i}-Area${totalEntities.indexOf(entity)+1}`
									let header = `Area${totalEntities.indexOf(entity)+1}`
									midResult.push({
										Header: header,
										accessor: accessor
									})
								}
							})
							floorWiseData.push(midResult)
						}
						
						setTableData(fillArray(rows, floor.length))
						setColumn(floorWiseData)
						setFloorWiseImages(fillArray([], floor.length))
						setComments(fillArray([], floor.length))
					})
				}
			})

			
		})()
		
	},[])

	const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
	    setTableData(oldData =>{
		    let old = oldData[tabValue]
		     let newData = old.map((row, index) => {
		     	if (index === rowIndex) {
		      	  return {
		            ...old[rowIndex],
		            [columnId]: value,
		          }
		        }
		        return row
		      })
		      oldData.splice(tabValue, 1, newData)
		      return oldData
	    })
  	}

	function handleChangeTab(event, value) {
		event.preventDefault()
		tabDisptacher({type: 'setTabValue', value:value})
	}

	function handleUploadChange(e) {
		const file = e
		//const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);
		
		reader.onload = () => {
					let newImageArray1 = [...floorWiseImages[tabValue], {
						id: FuseUtils.generateGUID(),
						url: `data:${file.type};base64,${btoa(reader.result)}`,
						type: 'image',
						caption:caption
					}]
			
			setFloorWiseImages(old=>{
				let newarr = old.map((old,index)=>{
					if(index===tabValue){
						return newImageArray1
					}
					else{
						return old
					}
				})
				return newarr
			})
		};

		reader.onerror = () => {
			console.log('error on load image');
			alert('error loading image')
		};
	}

	// if (
	// 	(!product.data || (product.data && routeParams.productId !== product.data.id)) &&
	// 	routeParams.productId !== 'new'
	// ) {
	// 	return <FuseLoading />;
	// }
	const getTabs = () => {
		return tabs.map(floor=><Tab key={tabs.indexOf(floor)} className="h-64 normal-case" label={floor} />)
	}
	const getTabWiseData = () => {
		return(
			<div>
				<Table columns={column.length>0?column[tabValue]:[]} data={tableData!==undefined?tableData[tabValue]:[]} updateMyData={updateMyData}/>
				<TextField
					className="mt-8 mb-16"
					name="description"
					onChange={handleCommentChange}
					label="Comments"
					type="text"
					value={comments[tabValue]}
					multiline
					rows={5}
					variant="outlined"
					fullWidth
				/>
				<label> Images for {tabs[tabValue]} </label>
				<div className="flex justify-center sm:justify-start flex-wrap -mx-8 py-32">
					<label htmlFor="button-file" className={clsx(classes.productImageUpload, 'flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5')}>
						<input accept="image/*" className="hidden" id="button-file" type="file" onChange={handleClickOpen} />
							<Icon fontSize="large" color="action">
								cloud_upload
							</Icon>
					</label>
					{floorWiseImages.length>0 && floorWiseImages[tabValue].length>0 ?
						 floorWiseImages[tabValue].map(media=>
								<div key={media.id}>
									<div
										tabIndex={0}
										className={clsx(
											classes.productImageItem,
											'flex items-center justify-center relative w-128 h-128 rounded-4 mx-8 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
										)}
										
									>
										<img className="max-w-none w-auto h-full" src={media.url} alt="product" />
									</div>
									<p className="w-128 mx-8 overflow-scroll">{media.caption}</p>
								</div>
							)
						: undefined
					} 
				</div>
			</div>
		)
	}
	const handleSave = () => {
		let opts = {projectId : props.id, floors : tabs, columns:column, rows:tableData, floorWiseImages : floorWiseImages, comments : comments, date:new Date()}
		axios.post('http://localhost:3001/reports/ ', opts)
		.then(response=>{
			if(response.status===201){
				setAlertStatus(true)
				setTimeout(()=>{
					props.handleClose()
				},1000)
			}
		})
	}
	if(tabs.length===0)
		return <FuseLoading/>
	return (
		<div>
			<Dialog open={alertStatus} onClose={handleClose} aria-labelledby="form-dialog-title">
		        <DialogTitle id="form-dialog-title">Congrats !!!</DialogTitle>
		        <DialogContent>
		          	<DialogContentText>
			            Report Updated Successfully !
		          	</DialogContentText>
			    </DialogContent>
		    </Dialog>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
		        <DialogTitle id="form-dialog-title">Caption?</DialogTitle>
		        <DialogContent>
		          	<DialogContentText>
			            Please enter caption. What is this image for? (E.g, Kitchen)
		          	</DialogContentText>
			          <TextField
			            autoFocus
			            margin="dense"
			            id="name"
			            label="Caption"
			            type="caption"
			            value={caption}
			            fullWidth
			            onChange={handleCaptionChange}
			          />
		        </DialogContent>
		        <DialogActions>
			          <Button onClick={handleClose} color="primary">
			            Cancel
			          </Button>
			          <Button onClick={submitCaption} color="primary">
			            Submit
			          </Button>
		        </DialogActions>
		    </Dialog>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={
					(
						<div className="flex flex-1 w-full items-center justify-center" style={{margin:'8%'}}>
							
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Button
									className="whitespace-no-wrap normal-case my-8"
									variant="contained"
									color="secondary"
									onClick={handleSave}
								>
									save
								</Button>
							</FuseAnimate>
						</div>
					)
				}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleChangeTab}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						
						{getTabs()}
					</Tabs>
				}
				content={
					(
						<div className="p-16 sm:p-24 max-w-2xl">
							{getTabWiseData()}
						</div>
					)
				}
				innerScroll
			/>
		</div>
	);
}

export default ArchitectForm;
