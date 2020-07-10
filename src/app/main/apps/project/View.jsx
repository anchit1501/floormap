import React, { useState } from 'react';
import Maps from './map';
import MapContainer from './subMap';
import jeddah from './data/Jeddah.json';
import sb from './data/SB-28-DMC.json';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { filter } from 'lodash';

export default function View() {
	const [active, setActive] = useState(null);
	const search = ['Jeddah', 'Rabwa'];
	const initalCenter = [23.40134444, 43.18888889];
	const parent = [
		{
			center: [21.69561837411722, 39.09240158007016],
			name: 'Jeddah',
			file: jeddah
		},
		{
			center: [24.655125, 46.787456],
			name: 'Rabwa',
			file: sb
		}
	];
	const searchList = [{ name: 'Rabwa' }, { name: 'Jeddah' }];

	return (
		<div>
			<Autocomplete
				id="combo-box-demo"
				options={searchList}
				onChange={(event, newValue) => {
					console.log(newValue);
					if (newValue === null || newValue.name === null) setActive(null);
					else setActive(newValue.name);
				}}
				getOptionLabel={option => option.name}
				style={{ width: 300 }}
				renderInput={params => <TextField {...params} label="Search Here" variant="outlined" />}
			/>
			{active === null ? (
				<Maps initalCenter={initalCenter} parent={parent} search={search} setActive={name => setActive(name)} />
			) : (
				<MapContainer
					data={filter(parent, par => {
						return par.name === active;
					})}
				/>
			)}
		</div>
	);
}
