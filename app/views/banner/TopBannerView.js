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
			<TouchableHighlight underlayColor={'rgba(200,200,200,.1)'} onPress={() => general.openURL('https://itunes.apple.com/us/app/uc-san-diego-ucsd/id318646412?mt=8')}>
				<Image style={[css.card_plain, css.card_special_events]} source={{uri: this.state.bannerImageURI}} />
			</TouchableHighlight>
		);
	},

	_handleOnPress() {
		// Always use TimerMixin with requestAnimationFrame, setTimeout and
		// setInterval
		this.requestAnimationFrame(() => {
			this.gotoWelcomeWeekView();
		});
	},

	gotoWelcomeWeekView() {
		this.props.navigator.push({ id: 'WelcomeWeekView', title: 'Welcome Week', name: 'Welcome Week', component: WelcomeWeekView });
	}
});

module.exports = TopBannerView;