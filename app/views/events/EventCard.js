import React from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
} from 'react-native';

import EventService from '../../services/eventService';
import Card from '../card/Card';
import CardComponent from '../card/CardComponent';
import EventList from './EventList';
import EventListView from './EventListView';

import { getMaxCardWidth, getPrimaryColor, getPRM } from '../../util/general';

const logger = require('../../util/logger');

export default class EventCard extends CardComponent {

	constructor(props) {
		super(props);

		this.fetchEventsErrorInterval =	15 * 1000;			// Retry every 15 seconds
		this.fetchEventsErrorLimit = 3;
		this.fetchEventsErrorCounter = 0;

		this.state = {
			eventsData: [],
			eventsRenderAllRows: false,
			eventsDataLoaded: false,
			fetchEventsErrorLimitReached: false,
			eventsDefaultResults: 5
		};
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		EventService.FetchEvents()
		.then((responseData) => {
			this.setState({
				eventsData: responseData,
				eventsDataLoaded: true
			});
		})
		.catch((error) => {
			logger.error(error);
			if (this.fetchEventsErrorLimit > this.fetchEventsErrorCounter) {
				this.fetchEventsErrorCounter++;
				logger.log('ERR: fetchEvents1: refreshing again in ' + (this.fetchEventsErrorInterval / 1000) + ' sec');
				this.refreshEventsTimer = setTimeout( () => { this.refresh(); }, this.fetchEventsErrorInterval);
			} else {
				logger.log('ERR: fetchEvents2: Limit exceeded - max limit:' + this.fetchEventsErrorLimit);
				this.setState({ fetchEventsErrorLimitReached: true });
			}
		})
		.done();
	}

	gotoEventListView() {
		this.props.navigator.push({ id: 'EventListView', title: 'Events', name: 'Events', component: EventListView, data: this.state.eventsData });
	}

	render() {
		return (
			<Card id="events" title="Events">
				<View style={styles.events_list}>
					{this.state.eventsDataLoaded ? (
						<View>
							<EventList data={this.state.eventsData} navigator={this.props.navigator} />
							<TouchableHighlight underlayColor={'rgba(200,200,200,.1)'} onPress={() => this.gotoEventListView()}>
								<View style={styles.events_more}>
									<Text style={styles.events_more_label}>View All Events</Text>
								</View>
							</TouchableHighlight>
						</View>
					) : null}

					{this.state.fetchEventsErrorLimitReached ? (
						<View>
							<Text>There was a problem loading events, try back soon.</Text>
						</View>
					) : null }
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	events_list: { width: getMaxCardWidth() },
	events_more: { alignItems: 'center', justifyContent: 'center', width: getMaxCardWidth(), paddingHorizontal: 4, paddingTop: 8, paddingBottom: 4 },
	events_more_label: { fontSize: Math.round(20 * getPRM()), color: getPrimaryColor(), fontWeight: '300' },
});
