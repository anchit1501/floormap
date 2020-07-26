import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// import Image from '/assets/images/kitchen.jpg';
import { Link, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        padding: '200px 0 100px 0'
    },
    divider: {
        backgroundColor: theme.palette.divider
    },
    table: {
        borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'black'
    },
    image: {
        width: '400px',
        height: '300px'
    }
}));
const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#ff6c5c',
    },
})(LinearProgress);

function DateWiseReport(props) {
    const classes = useStyles();
    const [invoice, setInvoice] = useState(null);

    const [floors, setFloors] = useState([])
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [floorWiseImages, setFloorWiseImages] = useState([])
    const [comments, setComments] = useState([])
    const [projectId, setProjectId] = useState(0)
    const [date, setDate] = useState(null)

    const routeParams = useParams();
    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    useEffect(() => {
        console.log(routeParams)
        axios
            .get('/api/report/get-report', {
                params: { id: '5725a6802d' }
            })
            .then(res => {
                setInvoice(res.data);
            });
        axios
            .get('http://localhost:3001/reports',{
                params:{id:routeParams.id}
            })
            .then(res => {
                if(res.data.length===0)
                    alert('No such report id')
                else{
                    const {rows,columns,comments,floors,floorWiseImages,projectId,date}=res.data[0]
                    setFloors(floors)
                    setRows(rows)
                    setColumns(columns)
                    setComments(comments)
                    setFloorWiseImages(floorWiseImages)
                    setDate(date)
                    setProjectId(projectId)
                }
            });
    }, []);

    const getInfo = () => {

        if(rows.length===0 || rows===undefined || columns.length===0 || columns===undefined || floorWiseImages.length===0 || floorWiseImages===undefined || comments===undefined || comments.length===0)
            return undefined
        else
        return floors.map((floor, index)=>{
            return(
                <div key={index}>
                    <div className="mt-96 print:mt-0">
                        <Typography className="font-light" variant="h5" color="textSecondary">
                            Progress for {floor} 
                        </Typography>
                        <Table className="simple">
                            <TableHead>
                                <TableRow>
                                    {columns[index].map(column=><TableCell key={column.Header}>{column.Header}</TableCell>)
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows[index].map((row,i) => (
                                    <TableRow key={row.id}>
                                        {
                                            columns[index].map(column=>
                                                <TableCell key={column.accessor}>
                                                        {row[column.accessor]?row[column.accessor]:'-'}
                                                </TableCell>
                                            )
                                        }
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-96 print:mt-0">
                        <Typography className="font-light" variant="h5" color="textSecondary">
                            Comments of {floor} 
                        </Typography>
                        <div className="mt-16 print:mt-0">
                            <TextField
                                className="mt-8 mb-16"
                                name="description"
                                type="text"
                                value={comments[index]}
                                multiline
                                rows={5}
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mt-96 print:mt-0">
                        <Typography className="font-light" variant="h5" color="textSecondary">
                            Images of {floor} 
                        </Typography>
                        <div className="flex justify-center sm:justify-start flex-wrap -mx-8 py-32">
                
                        {
                            floorWiseImages[index].length>0?
                            floorWiseImages[index].map(media=>
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
                            : 
                            <Typography className="font-light" color="textSecondary">
                                No images have been uploaded by architect yet!!
                            </Typography>
                        } 
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className={clsx(classes.root, 'flex-grow flex-shrink-0 p-0 sm:p-64 print:p-0')}>
            {invoice && (
                <FuseAnimate animation={{ translateY: [0, '100%'] }} duration={600}>
                    <Card className="mx-auto w-xl print:w-full print:shadow-none">
                        <CardContent className="p-88 print:p-0">
                            <div className="flex flex-row justify-between items-start">
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-80 print:mb-0">

                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="pb-32">
                                                        <Typography className="font-light" variant="h3" color="textSecondary">
                                                            PROGRESS REPORT
												        </Typography>
                                                        {invoice.client.title && (
                                                            <Typography color="textSecondary">{invoice.client.title}</Typography>
                                                        )}
                                                        {invoice.client.address && (
                                                            <Typography color="textSecondary">{invoice.client.address}</Typography>
                                                        )}
                                                        {invoice.client.phone && (
                                                            <Typography color="textSecondary">{invoice.client.phone}</Typography>
                                                        )}
                                                        {invoice.client.email && (
                                                            <Typography color="textSecondary">{invoice.client.email}</Typography>
                                                        )}
                                                        {invoice.client.website && (
                                                            <Typography color="textSecondary">{invoice.client.website}</Typography>
                                                        )}
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                                <img
                                    className="w-160 print:w-60"
                                    src="assets/images/logos/fuse.svg"
                                    alt="logo"
                                />
                            </div>
                            <div className="mt-16 print:mt-0">
                                <Table className="simple" className={classes.table}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="right">Project :</TableCell>
                                            <TableCell align="left">Alfareeda Residential</TableCell>
                                            <TableCell align="right">Zone :</TableCell>
                                            <TableCell align="left">Zone 1</TableCell>
                                            <TableCell align="right">Plot # :</TableCell>
                                            <TableCell align="left">0310</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell align="right">Client :</TableCell>
                                            <TableCell align="left">Alfareeda Residential</TableCell>
                                            <TableCell align="right">Group # :</TableCell>
                                            <TableCell align="left">GR-07</TableCell>
                                            <TableCell align="right">BUA :</TableCell>
                                            <TableCell align="left">1000 sqm</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell align="right">Villa Code :</TableCell>
                                            <TableCell align="left">21-Z1</TableCell>
                                            <TableCell align="right">Sales Status :</TableCell>
                                            <TableCell align="left">Sold</TableCell>
                                            <TableCell align="right">Land Area :</TableCell>
                                            <TableCell align="left">1200 sqm</TableCell>
                                        </TableRow>


                                        <TableRow>
                                            <TableCell align="right">Contractor :</TableCell>
                                            <TableCell align="left">GLobal 1</TableCell>
                                            <TableCell align="right">Type :</TableCell>
                                            <TableCell align="left">C1</TableCell>
                                            <TableCell align="right">Style :</TableCell>
                                            <TableCell align="left">Tunisian</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </div>
                                
                                {getInfo()}

                            


                        </CardContent>
                    </Card>
                </FuseAnimate>
            )}
        </div>
    );
}

export default DateWiseReport;
