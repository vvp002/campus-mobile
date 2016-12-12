import React from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	Image,
	StyleSheet,
} from 'react-native';

import general, { getMaxCardWidth, getPrimaryColor, getPRM } from '../../util/general';
import NewsDetail from './NewsDetail';

const css = require('../../styles/css');
const moment = require('moment');

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class NewsItem extends React.Component {

	getStoryDescription(description, title) {
		let storyDescriptionStr = description.replace(/^ /g, '');
		storyDescriptionStr = storyDescriptionStr.substring(0,115).replace(/ $/,'') + '...';
		return storyDescriptionStr;
	}

	gotoNewsDetail(newsData) {
		this.props.navigator.push({ id: 'NewsDetail', name: 'News', title: 'News', component: NewsDetail, newsData });
	}

	render() {
		const data = this.props.data;
		const newsDate = moment(data.date).format('MMM Do, YYYY');
		const storyDescription = this.getStoryDescription(data.description, data.title);

		return (
			<TouchableHighlight style={css.dc_locations_row_left} underlayColor={'rgba(200,200,200,.1)'} onPress={() => this.gotoNewsDetail(this.props.data)}>
				<View style={styles.card_mainer}>
					<View style={styles.card_container}>
						{data.image ? (
							<Image style={styles.card_image} resizeMode="cover" source={{ uri: data.image }} />
						) : (
							<Image style={styles.card_image} resizeMode="cover" source={require('../../assets/img/MobileEvents_blank.jpg')} />
						)}
					</View>
					<View style={styles.title_container}>
						<Text
							style={styles.title}
							numberOfLines={3}
						>
							{data.title}
						</Text>
						<Text
							style={styles.card_postdate}
						>
							{newsDate}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	card_mainer: { flex:1, width: Math.round(getMaxCardWidth() * 0.777), borderWidth: 1, borderColor: '#DDD', backgroundColor: '#F9F9F9', alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden' },
	card_main: { flex:1, width: Math.round(getMaxCardWidth() * 0.777), borderWidth: 1, borderRadius: 2, borderColor: '#DDD', backgroundColor: '#F9F9F9', margin: 6, alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden' },
	title_container: { flex: 0.5, alignItems: 'center', width: Math.round(getMaxCardWidth() * 0.777), padding: 8, borderBottomWidth: 1, borderBottomColor: '#DDD' },
	title: { flex: 1, flexWrap: 'wrap', fontSize: Math.round(17 * getPRM()), color: '#000', fontWeight: '400' },
	card_container: { flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#EEE', alignItems: 'center' },
	card_image: { width: Math.round(getMaxCardWidth() * 0.777), height: Math.round(200 * getPRM()) },
	card_postdate: { fontSize: Math.round(11 * getPRM()), color: getPrimaryColor(), paddingTop: Math.round(8 * getPRM()) },
});

/*
<View style={styles.title_container}>
						<Text
							style={styles.title}
							numberOfLines={1}
						>
							{data.title}
						</Text>
					</View>
<TouchableHighlight underlayColor={'rgba(200,200,200,.1)'} onPress={() => this.gotoNewsDetail(this.props.data)}>
				<View style={css.card_main}>
					<View style={css.events_card_title_container}>
						<Text style={css.events_card_title}>{data.title}</Text>
					</View>
					<View style={css.events_card_container}>
						<View style={css.events_card_left_container}>
							{storyDescription ? (<Text style={css.events_card_desc}>{storyDescription}</Text>) : null }
							<Text style={css.events_card_postdate}>{newsDate}</Text>
						</View>
						{data.image ? (
							<Image style={css.news_card_image} source={{ uri: data.image }} />
						) : (
							<Image style={css.news_card_image} source={require('../../assets/img/MobileEvents_blank.jpg')} />
						)}
					</View>
				</View>
			</TouchableHighlight>
*/
