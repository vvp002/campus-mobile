import React from 'react';
import {
	View,
	Text,
	ScrollView
} from 'react-native';

import { MenuContext } from 'react-native-popup-menu';
import LayoutConstants from '../../../app/styles/LayoutConstants'
import Icon from 'react-native-vector-icons/Foundation';
const css = require('../../styles/css');

import emergency_alert from '../../../app/test/emergency-alert_emergency.json'
console.log("alert4:" + emergency_alert.emergencyStatus.emergencyType)

const Alerts = React.createClass({

	render() {
		if (emergency_alert.emergencyStatus.emergency) {
			var updates3 = []
			var updates = emergency_alert.emergencyStatus.statusUpdates.map(function(alertUpdate){
				alertUpdate ? updates3.push(
				<View style={css.alert_update}>
					<Text>{alertUpdate.time}</Text>
					<Text>{alertUpdate.message}</Text>
				</View>) : null;
		})}

		return (
				<View style={css.main_container}>
					<ScrollView
						ref={c => { this._scrollview = c; }}
						onScroll={this.handleScroll}
						scrollEventThrottle={69}
					>

						  { emergency_alert.emergencyStatus.emergency ? (
							<View style={css.alert_container}>
								<View backgroundColor={emergency_alert.emergencyStatus.emergencyType === 'emergency' ? 'red':'yellow'}
									style={css.alert_header}>
									<Text style={css.alert_header_text}>Emergency Alert</Text>
								</View>
								
								<View style={css.alert_body}>
									<View style={css.alert_body_summary}>
									<Icon style={css.alert_icon} 
									name="alert" size={30} 
									color={emergency_alert.emergencyStatus.emergencyType === 'emergency' ? 'red':'yellow'} />
									
										<View style={css.alert_status}>
											<Text style={css.alert_title}>{emergency_alert.emergencyStatus.title}</Text>
											<Text style={css.alert_message}>{emergency_alert.emergencyStatus.message}</Text>
											<View style={css.alert_update_body}>
												<ScrollView style={css.alert_scroll}>{updates3}</ScrollView>
											</View>
										</View>
									</View>
								</View>
								
								<View backgroundColor={emergency_alert.emergencyStatus.emergencyType === 'emergency' ? 'red':'yellow'} style={css.alert_footer}>
								</View>
							</View>
						) : null}
					</ScrollView>
				</View>
		);
	}
});

module.exports = Alerts;
