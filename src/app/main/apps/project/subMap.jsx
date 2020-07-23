import React, { Component } from 'react';
import './map.css';
import { size } from 'lodash';
import { Map, TileLayer, GeoJSON, Popup } from 'react-leaflet';

export default class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: '',
			active: null,
			area: 0
		};
	}

	render() {
		// const position = this.props.center;

		const style = (color = '#006400') => {
			return {
				color: color,
				weight: 5,
				opacity: 0.6,
				fillOpacity: 0.2
			};
		};

		const selectedStyle = (color = '#006400') => {
			return {
				weight: 5,
				color: color,
				opacity: 1,
				fillOpacity: 0.7
			};
		};

		function hoverStyle() {
			return {
				weight: 5,
				color: '#666',
				dashArray: '',
				opacity: 1
			};
		}

		function highlightFeature(e) {
			var layer = e.target;
			layer.setStyle(hoverStyle());
		}

		function resetHighlight(e) {
			var layer = e.target;
			let color = layer.feature.properties.fill;

			layer.setStyle({
				weight: 5,
				color: color,
				dashArray: '',
				opacity: 0.7
			});
		}

		const clicked = e => {
			if (this.state.active === null) {
				var layer = e.target;
				this.setState(
					{
						active: layer,
						area: layer.options.area ? layer.options.area : 0
					},
					() => {
						layer.setStyle(selectedStyle(layer.feature.properties.fill));
						console.log(layer);
						console.log('prop', layer.feature.properties.fill);
						// this.props.onSelect(layer.options.id);
					}
				);
			} else if (this.state.active === e.target) {
				let layer = e.target;
				this.setState({ active: null, area: 0 }, () => {
					layer.setStyle(style(layer.feature.properties.fill));
				});
			} else {
				let layer = this.state.active;
				layer.setStyle(style(layer.feature.properties.fill));
				layer = e.target;
				this.setState({ active: layer, area: layer.options.area ? layer.options.area : 0 }, () =>
					layer.setStyle(selectedStyle(layer.feature.properties.fill))
				);
			}
			// console.log("state", this.state.active, this.state.active.options.area);

			// this.setState({ active: e.target });
		};

		function onEachFeature(component, feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: clicked
			});
		}
		const popupContent = {
			textAlign: 'center',
			height: 'auto',
			margin: '10px'
		};

		const handleSelect = id => {
			localStorage.setItem('Plot', id);
			if (id.indexOf('Rabwa') >= 0) {
				localStorage.setItem('city', 'Rabwa');
			} else {
				localStorage.setItem('city', 'Jeddah');
			}
		};
		if (size(this.props.data) < 1) return <p>hii</p>;

		console.log('data', this.props.data);
		return (
			<div>
				<Map
					center={this.props.data[0].center}
					zoom={this.props.data[0].file.features.length < 10 ? 18 : 18}
					doubleClickZoom={false}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					{this.props.data[0].file.features.map((value, index) => (
						<GeoJSON
							id={index}
							data={value}
							style={style(value.properties.fill)}
							onEachFeature={onEachFeature.bind(null, this)}
							useRef="geojson"
							key={index}
							area={value.area}
							onMouseOver={e => {
								e.target.openPopup();
							}}
							onMouseOut={e => {
								e.target.closePopup();
							}}
							onclick={() => handleSelect(this.props.data[0].name + (index + 1))}
						>
							<Popup>
								<div style={popupContent}></div>
								Block Id: {this.props.data[0].name} {index + 1}
								<p> Gross Land Area: {value.area}</p>
							</Popup>
						</GeoJSON>
					))}
				</Map>
			</div>
		);
	}
}
