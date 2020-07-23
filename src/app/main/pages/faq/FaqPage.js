import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import ArchitectReportsList from '../../../../app/main/apps/project/ArchitectReportsList';

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	},
	panel: {
		margin: 0,
		borderWidth: '1px 1px 0 1px',
		borderStyle: 'solid',
		borderColor: theme.palette.divider,
		'&:first-child': {
			borderRadius: '16px 16px 0 0'
		},
		'&:last-child': {
			borderRadius: '0 0 16px 16px',
			borderWidth: '0 1px 1px 1px'
		},
		'&$expanded': {
			margin: 'auto'
		}
	},
	expanded: {}
}));

function FaqPage() {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [expanded, setExpanded] = useState(null);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		axios.get('/api/faq').then(res => {
			setData(res.data);
		});
	}, []);

	useEffect(() => {
		function getFilteredArray(arr, _searchText) {
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		setFilteredData(getFilteredArray(data, searchText));
	}, [data, searchText]);

	const toggleExpansion = panel => (event, _expanded) => {
		setExpanded(_expanded ? panel : false);
	};

	function handleSearch(event) {
		setSearchText(event.target.value);
	}
	const loc = window.location.href.split('/');
	return (
		<div className="w-full flex flex-col flex-auto">
			<ArchitectReportsList id={parseInt(loc[loc.length - 1])} />
		</div>
	);
}

export default FaqPage;
