{ this.state.emergencyAlert ? (
    <View style={css.alert_container}>
        <View backgroundColor={this.state.emergencyType === 'emergency' ? 'red':'yellow'}
            style={css.alert_header}>
            <Text style={css.alert_header_text}>Emergency Alert</Text>
        </View>
        
        <View style={css.alert_body}>
            <View style={css.alert_body_summary}>
                <Icon style={css.alert_icon} 
                name="alert" size={30} 
                color={this.state.emergencyType === 'emergency' ? 'red':'yellow'} />
                
                <View style={css.alert_status}>
                    <Text style={css.alert_title}>{emergencyJSON.emergencyStatus.title}</Text>
                    <Text style={css.alert_message}>{emergencyJSON.emergencyStatus.message}</Text>
                    <View style={css.alert_update_body}>
                        <Text style={css.bold}>UPDATES:</Text>
                        <ScrollView style={{height:130}}>{updates3}</ScrollView>
                    </View>
                </View>
            </View>
        </View>
        <View style={css.alert_footer_container}>
        { this.state.emergencyUpdateCount > 3 ? (
            <Touchable onPress={() => Actions.Alerts()}>
                <View style={css.alert_more}>
                    <Text style={css.alert_more_label}>View All</Text>
                </View>
            </Touchable>
        ) : null }
        <View backgroundColor={this.state.emergencyType === 'emergency' ? 'red':'yellow'} style={css.alert_footer}>
        </View>
        </View>
    </View>
) : null
}

// if (this.state.emergencyAlert) {
			// 	var updates3 = []
			// 	var updates = emergencyJSON.emergencyStatus.statusUpdates.map(function(alertUpdate){
			// 		alertUpdate ? updates3.push(
			// 		<View style={css.alert_update}>
			// 			<Text>{alertUpdate.time}</Text>
			// 			<Text>{alertUpdate.message}</Text>
			// 		</View>) : null;
			// })}}