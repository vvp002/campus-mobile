import React from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	Image,
	StyleSheet
} from 'react-native';

import EventDetail from './EventDetail';
import general, { getMaxCardWidth, getPrimaryColor, getPRM } from '../../util/general';

const moment = require('moment');

export default class EventItemCard extends React.Component {

	gotoEventDetail(eventData) {
		this.props.navigator.push({ id: 'EventDetail', name: 'EventDetail', title: 'Events', component: EventDetail, eventData });
	}

	render() {
		const data = this.props.data;
		let eventTitleStr = data.title;// EventTitle.replace('&amp;','&');
		eventTitleStr = eventTitleStr.trim();
		const eventDescriptionStr = data.description;// EventDescription.replace('&amp;','&').replace(/\n.*/g,'').trim();
		let eventDescriptionStrTrimmed;
		if (eventDescriptionStr) {
			eventDescriptionStrTrimmed = eventDescriptionStr;// .substring(0,150);
			/*
			if (eventDescriptionStr.length > 150) {
				eventDescriptionStrTrimmed += '...';
			}*/
		}

		const eventDateDay = moment(data.eventdate).format('MMM Do') + ', ' + general.militaryToAMPM(data.starttime) + ' - ' + general.militaryToAMPM(data.endtime);

		return (
			<TouchableHighlight underlayColor={'rgba(200,200,200,.1)'} onPress={() => this.gotoEventDetail(data)}>
				<View style={styles.card_main}>
					<View style={styles.title_container}>
						<Text
							style={styles.title}
							numberOfLines={1}
						>
							{eventTitleStr}
						</Text>
					</View>
					<View style={styles.card_container}>
						<View style={styles.content_container}>
							<View style={styles.image_container}>
								<Image style={styles.card_image} source={{ uri: data.imagethumb }} />
							</View>
							{eventDescriptionStr ? (
								<Text
									style={styles.card_desc}
									numberOfLines={3}
								>
									{eventDescriptionStrTrimmed}
								</Text>
								) : null }
							<Text style={styles.card_postdate}>{eventDateDay}</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	card_main: { flex:1, width: Math.round(getMaxCardWidth() * 0.666), borderWidth: 1, borderRadius: 2, borderColor: '#DDD', backgroundColor: '#F9F9F9', margin: 6, alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden' },
	title_container: { flexDirection: 'row', alignItems: 'center', width: Math.round(getMaxCardWidth() * 0.666), padding: 8, borderBottomWidth: 1, borderBottomColor: '#DDD' },
	title: { flex:1, flexWrap: 'wrap', fontSize: Math.round(17 * getPRM()), color: '#000', fontWeight: '400' },
	card_container: { flex: 1, flexDirection: 'row', padding: 14, borderBottomWidth: 1, borderBottomColor: '#EEE', alignItems: 'center' },
	content_container: { flex: 1 },
	image_container: { flex:1, justifyContent: 'center', alignItems: 'center' },
	card_image: { width: Math.round(130 * getPRM()), height: Math.round(73 * getPRM()), marginRight: Math.round(4 * getPRM()), marginLeft: Math.round(10 * getPRM()), borderWidth: 1, borderColor: '#CCC' },
	card_desc: { flexWrap: 'wrap', fontSize: Math.round(14 * getPRM()), color: '#666', paddingTop: Math.round(8 * getPRM()) },
	card_postdate: { fontSize: Math.round(11 * getPRM()), color: getPrimaryColor(), paddingTop: Math.round(8 * getPRM()) },
});
