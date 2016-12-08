import React from 'react';
import {
	View,
	ListView,
	Text,
	TouchableHighlight,
	ScrollView
} from 'react-native';
import EventItem from './EventItem';
import EventItemCard from './EventItemCard';
import CardSlider from 'react-native-cards-slider';

const css = require('../../styles/css');

export default class EventList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			eventsRenderAllRows: false
		};
		this.datasource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	}

	render() {
		let eventData = [];
		if (this.state.eventsRenderAllRows) {
			eventData = this.props.data;
		} else {
			eventData = this.props.data;
			// eventData = this.props.data.slice(0, 3);
		}

		const eventDatasource = this.datasource.cloneWithRows(eventData);

		return (
			<ScrollView
				horizontal={true}
			>
				{
					eventData.map((data, index) => (<EventItemCard key={index} data={data} navigator={this.props.navigator} />))
				}
			</ScrollView>
		);

		return (
			<View>
				<ListView
					dataSource={eventDatasource}
					renderRow={(row) => <EventItem data={row} navigator={this.props.navigator} />}
				/>
			</View>
		);
	}
}
