import React, { PropTypes } from 'react';
import {
	ListView,
	View,
	Text,
} from 'react-native';
import { connect } from 'react-redux';

import css from '../../styles/css';
import { getData } from './scheduleData';

const fullScheduleDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var scheduleData = getData();

class FullSchedule extends React.Component {
	componentDidMount() {
		logger.ga('Card Mounted: Full Schedule');
	}
	render () {
		return (
			<ScrollView style={css.main_full}>
				<ListView
					dataSource={fullScheduleDataSource.cloneWithRows(this.props.fullScheduleData)}
					// dataSource={dataSource.cloneWithRows((rows) ? (this.props.scheduleData.slice(0,rows)) : (this.props.scheduleData))}
					renderRow={(rowData, sectionID, rowID, highlightRow) => {
						<ScheduleDay
							id={rowID}
							data={rowData}
						/>
					}}
				/>
			</ScrollView>
		);
	}
}
// const FullScheduleList = ({ style, data, rows, scrollEnabled, item, card }) => {
// 	return (
// 		<ListView
// 			style={style}
// 			scrollEnabled={scrollEnabled}
// 			dataSource={dataSource.cloneWithRows((rows) ? (data.slice(0,rows)) : (data))}
// 			renderRow={(rowData, sectionID, rowID, highlightRow) => {
// 				<ScheduleDay
// 					id={rowID}
// 					data={rowData}
// 				/>
// 			}}
// 		/>
// )};

var ScheduleDay = ({ id, data }) => (
	<View style={css.sc_dayContainer}>
		<Text style={css.sc_dayText}>
			{id}
		</Text>
		<DayList courseItems={data} />
	</View>
);

var DayList = ({ courseItems }) => (
	<ListView
		dataSource={dataSource.cloneWithRows(courseItems)}
		renderRow={(rowData, sectionID, rowID, highlightRow) => (
			<DayItem key={rowID} data={rowData} />
		)}
	/>
);

var DayItem = ({ data }) => (
	<View style={css.sc_dayRow}>
		<Text
			style={css.sc_courseText}
			numberOfLines={1}
		>
			{data.course_title}
		</Text>
		<Text style={css.sc_subText}>
			{data.time_string + '\n'}
			{data.building + data.room}
		</Text>
	</View>
);

function mapStateToProps(state) {
	return {
		fullScheduleData: state.schedule.data,
	};
}

const FullScheduleListView = connect(
	mapStateToProps
)(FullSchedule);

export default FullScheduleListView;