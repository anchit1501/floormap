import React, { Component, Fragment } from 'react';
import './map.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { size } from 'lodash';

export default class Maps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showBub: false
		};
	}
	render() {
		if (size(this.props.parent) < 1) return <Fragment />;

		return (
			<div>
				{/* <TextField id="outlined-search" label="Search field" type="search" variant="outlined" /> */}
				<Map center={this.props.initalCenter} zoom={7}>
					<TileLayer
						url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>

					{this.props.parent.map(k => (
						<Marker position={k.center}>
							<Popup>
								<h2>{k.name}</h2>
								<p> Number of Plots: {k.file.features.length}</p>
								<button onClick={() => this.props.setActive(k.name)}>continue</button>
							</Popup>
						</Marker>
					))}
				</Map>
			</div>
		);
	}
}
