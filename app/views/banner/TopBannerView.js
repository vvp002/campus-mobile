import React from 'react';
import {
	TouchableHighlight,
	Image,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import BannerView from './BannerView';
import WelcomeWeekView from '../welcomeWeek/WelcomeWeekView';

const css = require('../../styles/css');
const general = require('../../util/general');
const AppSettings = require('../../AppSettings');

const TopBannerView = React.createClass({
	mixins: [TimerMixin],
	getInitialState() {
		return {
			site: {
				title: 'Welcome Week',
				url: AppSettings.WELCOME_WEEK_URL
			},
			bannerImageURI: 'https://placeholdit.imgix.net/~text?txtsize=42&txt=1242%C3%97250&w=1242&h=250',
		};
	},

	render() {
		return (
			<TouchableHighlight underlayColor={'rgba(200,200,200,.1)'} onPress={() => this.gotoUCSDMobileAppStore()}>
				<Image style={[css.card_plain, css.card_special_events]} source={{uri: this.state.bannerImageURI}} />
			</TouchableHighlight>
		);
	},

	gotoUCSDMobileAppStore() {
		if (general.platformIOS()) {
			general.openURL('https://itunes.apple.com/app/id318646412');
		} else if (general.platformAndroid()) {
			general.openURL('https://play.google.com/store/apps/details?id=edu.ucsd');
		}
	},

	gotoWelcomeWeekView() {
		this.props.navigator.push({ id: 'WelcomeWeekView', title: 'Welcome Week', name: 'Welcome Week', component: WelcomeWeekView });
	}
});

module.exports = TopBannerView;