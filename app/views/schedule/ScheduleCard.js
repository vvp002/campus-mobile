import React, { PropTypes } from 'react';
import {
	View,
	// Text,
	StyleSheet,
	TouchableHighlight,
	ActivityIndicator
} from 'react-native';
import moment from 'moment';
// import Icon from 'react-native-vector-icons/Ionicons';

import { dayOfWeekInterpreter } from './scheduleData';
import ScheduleText from './ScheduleCardText';
import Card from '../card/Card';
import buildingCode from './BuildingCode';

// import css from '../../styles/css';
import {
	// COLOR_MGREY,
	// COLOR_PRIMARY,
	COLOR_LGREY,
	// COLOR_SECONDARY,
	// COLOR_BLACK,
	COLOR_VDGREY,
	COLOR_DGREY,
	// COLOR_DMGREY
} from '../../styles/ColorConstants';
import { MAX_CARD_WIDTH } from '../../styles/LayoutConstants';

const numberOfCoursesToShow = 4;

const ScheduleCard = (props) => {
	const { coursesToShow, actionButton } = props;
	const moments = new Array(numberOfCoursesToShow);
	if (props.firstYetToHappenCardIndex >= numberOfCoursesToShow) console.err('firstYetToHappenCardIndex should be 0-3');
	for (let i = props.firstYetToHappenCardIndex; i < numberOfCoursesToShow; i++) {
		let courseStart = moment().startOf('day')
			.day(coursesToShow[i].day_code)
			.second(coursesToShow[i].start_time);
		if (courseStart.isBefore()) courseStart = courseStart.add(7, 'days');
		while (moments[i - 1] && courseStart.isBefore(moments[i - 1].startTime)) {
			courseStart = courseStart.add(7, 'days');
		}
		let courseEnd = moment().startOf('day')
			.day(coursesToShow[i].day_code)
			.second(coursesToShow[i].end_time);
		while (courseEnd.isBefore(courseStart)) {
			courseEnd = courseEnd.add(7, 'days');
		}
		const courseTime = {
			startTime : courseStart,
			endTime : courseEnd
		};
		moments[i] = courseTime;
		// console.warn(courseEnd.format("dddd, MMMM Do YYYY, h:mm:ss a"));
	}
	for (let i = props.firstYetToHappenCardIndex - 1; i >= 0; i--) {
		let courseStart = moment().startOf('day')
			.day(coursesToShow[i].day_code)
			.second(coursesToShow[i].start_time);
		if (courseStart.isAfter()) courseStart = courseStart.subtract(7, 'days');
		while (moments[i + 1] && courseStart.isAfter(moments[i + 1].startTime)) {
			courseStart = courseStart.subtract(7, 'days');
		}
		let courseEnd = moment().startOf('day')
			.day(coursesToShow[i].day_code)
			.second(coursesToShow[i].end_time);
		while (courseEnd.isBefore(courseStart)) {
			courseEnd = courseEnd.subtract(7, 'days');
		}
		const courseTime = {
			startTime : courseStart,
			endTime : courseEnd
		};
		moments[i] = courseTime;
	}
	const activeCourseLocationDetails = buildingCode.find(e => (props.coursesToShow[props.activeCourse].building === e.Code));
	// console.warn(JSON.stringify(moment()));
	// console.warn(JSON.stringify(coursesToShow[0]));
	return (
		<Card id="schedule" title="Upcoming Classes">
			{coursesToShow.length === numberOfCoursesToShow ? (
				<View style={styles.sc_scheduleCard}>
					<View style={styles.container}>
						<View style={styles.leftHalf}>
							<View style={styles.leftHalf_upper}>
								<View style={styles.leftHalf_upper_timeText}>
									<ScheduleText style={styles.leftHalf_upper_timeText_firstSection}>
										{/* Today 9 */}
										{TodayTomorrowOrLater(dayOfWeekInterpreter(props.coursesToShow[props.activeCourse].day_code), moments[props.activeCourse].startTime)}
									</ScheduleText>
									<ScheduleText style={styles.leftHalf_upper_timeText_secondSection}>
										{/* AM */}
										{moments[props.activeCourse].startTime.format('A')}
									</ScheduleText>
								</View>
								<View style={styles.leftHalf_upper_classText}>
									<ScheduleText style={styles.leftHalf_upper_classText_firstSection}>
										{props.coursesToShow[props.activeCourse].subject_code + ' '
											+ props.coursesToShow[props.activeCourse].course_code}
									</ScheduleText>
									<ScheduleText style={styles.leftHalf_upper_classText_secondSection}>
										{props.coursesToShow[props.activeCourse].meeting_type}
									</ScheduleText>
								</View>
							</View>
							<View style={styles.leftHalf_lower}>
								<View style={styles.leftHalf_lower_sections}>
									<ScheduleText style={styles.leftHalf_lower_sections_icon}></ScheduleText>
									<View style={styles.leftHalf_lower_sections_text}>
										<ScheduleText style={styles.leftHalf_lower_sections_text_topSection}>
											{/* In Session */}
											{(moments[props.activeCourse].startTime.isBefore() ? '' : 'Starts ') + moments[props.activeCourse].startTime.fromNow()}
										</ScheduleText>
										<ScheduleText style={styles.leftHalf_lower_sections_text_bottomSection}>
											{/* Start and Finish Time */}
											{props.coursesToShow[props.activeCourse].time_string}
										</ScheduleText>
									</View>
								</View>
								<View style={styles.leftHalf_lower_sections}>
									<ScheduleText style={styles.leftHalf_lower_sections_icon}></ScheduleText>
									<View style={styles.leftHalf_lower_sections_text}>
										<ScheduleText style={styles.leftHalf_lower_sections_text_topSection}>
											{/* Pepper Canyon Hall 106 */}
											{(activeCourseLocationDetails ?
												activeCourseLocationDetails.Building
												: props.coursesToShow[props.activeCourse].building) + ' '
											+ props.coursesToShow[props.activeCourse].room}
										</ScheduleText>
										<ScheduleText style={styles.leftHalf_lower_sections_text_bottomSection}>
											{/* In Sixth College */}
											{activeCourseLocationDetails ?
												activeCourseLocationDetails.Location
												: 'Class Room Location'}
										</ScheduleText>
									</View>
								</View>
								<View style={styles.leftHalf_lower_sections}>
									<ScheduleText style={styles.leftHalf_lower_sections_icon}></ScheduleText>
									<View style={styles.leftHalf_lower_sections_text}>
										<ScheduleText style={styles.leftHalf_lower_sections_text_topSection}>
											{/* 1 More Class Today */}
											{props.coursesToShow[props.activeCourse].grade_option === 'L' ?
												'Letter Grade' : 'Pass/No Pass'}
										</ScheduleText>
										<ScheduleText style={styles.leftHalf_lower_sections_text_bottomSection}>
											{/* Last Class Ends at 10:00 AM */}
											{/* Evaluation Option */}
											{props.coursesToShow[props.activeCourse].units + ' Unit Class'}
										</ScheduleText>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.rightHalf}>
							<DayItem
								data={coursesToShow[0]}
								active={props.activeCourse === 0}
								onClick={props.onClickCourse}
								index={0}
							/>
							<DayItem
								data={coursesToShow[1]}
								active={props.activeCourse === 1}
								onClick={props.onClickCourse}
								index={1}
							/>
							<DayItem
								data={coursesToShow[2]}
								active={props.activeCourse === 2}
								onClick={props.onClickCourse}
								index={2}
							/>
							<DayItem
								data={coursesToShow[3]}
								active={props.activeCourse === 3}
								onClick={props.onClickCourse}
								index={3}
							/>
						</View>
					</View>
					{actionButton}
				</View>
			) : (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>
			)}
		</Card>
	);
};

const C = {
	L: MAX_CARD_WIDTH * 0.006,
	R: MAX_CARD_WIDTH * 0.004
};

const styles = StyleSheet.create({
	loadingContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: MAX_CARD_WIDTH ,
		height: (MAX_CARD_WIDTH / 1.6216) + 44
	},
	container: {
		width: MAX_CARD_WIDTH,
		aspectRatio: 1.6216,
		paddingTop: MAX_CARD_WIDTH * 0.05,
		paddingBottom: MAX_CARD_WIDTH * 0.05,
		paddingLeft: MAX_CARD_WIDTH * 0.04,
		paddingRight: MAX_CARD_WIDTH * 0.04,
		flexDirection: 'row'
	},
	leftHalf: { flex: 6 },
	leftHalf_upper: { flex: 3 },
	leftHalf_upper_timeText: { flex: 1, flexDirection: 'row' },
	leftHalf_upper_timeText_firstSection: {
		fontSize: C.L * 7,
		marginLeft: C.L * 1,
		marginRight: C.L * 1.5,
		// fontWeight: 'bold',
		color: COLOR_DGREY
	},
	leftHalf_upper_timeText_secondSection: {
		fontSize: C.L * 6,
		alignSelf: 'flex-end',
		// marginBottom: C.L * 0.5,
		// fontWeight: 'bold',
		color: COLOR_DGREY
	},
	leftHalf_upper_classText: { flex: 2, flexDirection: 'row', alignItems: 'flex-end' },
	leftHalf_upper_classText_firstSection: {
		fontSize: C.L * 15,
		fontWeight: 'bold',
		marginRight: C.L * 3,
		overflow: 'hidden',
		lineHeight: Math.round(C.L * 16.5),
	},
	leftHalf_upper_classText_secondSection: {
		fontSize: C.L * 5,
		// alignSelf: 'flex-end',
		marginBottom: Math.round(C.L * 16.5) * 0.10,
		color : COLOR_DGREY
	},

	leftHalf_lower: { flex: 7 },
	leftHalf_lower_sections: { marginTop: C.L * 3.75, flexDirection: 'row' },
	leftHalf_lower_sections_icon: {
		fontFamily: 'Material Design Icons',
		fontSize: C.L * 15.5,
		marginRight: C.L * 4,
		lineHeight: Math.round(C.L * 16),
		top: -C.L * 0.5,
	},
	leftHalf_lower_sections_text: {},
	leftHalf_lower_sections_text_topSection: {
		fontSize: C.L * 6,
		paddingTop: C.L * 0.25
	},
	leftHalf_lower_sections_text_bottomSection: {
		fontSize: C.L * 4.5,
		paddingTop: C.L * 1,
		color: COLOR_DGREY
	},

	rightHalf: {
		flex: 4,
		paddingTop: C.R * 0.5,
		justifyContent: 'space-between'
	},
	rightHalf_eachOfFourCards: {
		borderColor: COLOR_DGREY,
		borderWidth: C.R * 0.5,
		borderRadius: C.R * 1,
		paddingLeft: C.R * 4,
		paddingTop: C.R * 2.5,
		overflow: 'hidden',
		width: '100%',
		aspectRatio: 3.16,
	},
	rightHalf_activeCard: {
		borderColor: COLOR_VDGREY,
		borderWidth: C.R * 0.75,
		paddingLeft: C.R * 3.75,
		paddingTop: C.R * 2.25,
	},
	rightHalf_each_dayAndTime: {
		flexDirection: 'row',
		height: Math.round(C.R * 9)
	},
	rightHalf_each_dayAndTime_text: {
		width: C.R * 70,
		fontSize: C.R * 6.5,
	},
	rightHalf_each_dayAndTime_icon: {
		fontSize: C.R * 9,
		top: -C.R * 3.5,
		fontFamily: 'Material Design Icons',
		lineHeight: Math.round(C.R * 9),
	},
	rightHalf_each_classAndItsType: { flexDirection: 'row', top: C.R * 1 },
	rightHalf_each_classAndItsType_class: {
		width: C.R * 55,
		fontSize: C.R * 11,
	},
	rightHalf_each_classAndItsType_type: {
		fontSize: C.R * 6,
		alignSelf: 'flex-end',
		paddingBottom: C.R * 1
	},
	rightHalf_each_inActiveText: {
		color: COLOR_DGREY
	},
});

// Holds the view for an individual section/class
const DayItem = (props) => {
	const { data } = props;
	return (
		<TouchableHighlight
			onPress={() => props.onClick(props.index)}
			underlayColor={COLOR_LGREY}
			activeOpacity={0.5}
		>
			<View style={[styles.rightHalf_eachOfFourCards, props.active && styles.rightHalf_activeCard]}>
				<View style={styles.rightHalf_each_dayAndTime}>
					<ScheduleText style={[styles.rightHalf_each_dayAndTime_text, !props.active && styles.rightHalf_each_inActiveText]}>
						{dayOfWeekInterpreter(data.day_code).substring(0, 3) + ' ' + data.time_string}
					</ScheduleText>
					{props.active && (
						<ScheduleText style={[styles.rightHalf_each_dayAndTime_icon, !props.active && styles.rightHalf_each_inActiveText]}></ScheduleText>
					)}
				</View>
				<View style={styles.rightHalf_each_classAndItsType}>
					<ScheduleText style={[styles.rightHalf_each_classAndItsType_class, !props.active && styles.rightHalf_each_inActiveText]}>
						{data.subject_code + ' ' + data.course_code}
					</ScheduleText>
					<ScheduleText style={[styles.rightHalf_each_classAndItsType_type, !props.active && styles.rightHalf_each_inActiveText]}>
						{data.meeting_type}
					</ScheduleText>
				</View>
			</View>
		</TouchableHighlight>
	);
};

const TodayTomorrowOrLater = (dayOfWeekText, momentItem) => {
	let intepretedString = '';
	if (momentItem.isBetween(
		moment().subtract(1, 'day').startOf('day'),
		moment().subtract(1, 'day').endOf('day')
	)) {
		intepretedString = 'Yesterday';
	}
	else if (momentItem.isBetween(
		moment().startOf('day'),
		moment().endOf('day')
	)) {
		intepretedString = 'Today';
	}
	else if (momentItem.isBetween(
		moment().add(1, 'days').startOf('day'),
		moment().add(1, 'days').endOf('day')
	)) {
		intepretedString = 'Tomorrow';
	}
	else {
		intepretedString = dayOfWeekText;
	}
	intepretedString += ' ';
	if (momentItem.format('mm') === '00') {
		intepretedString += momentItem.format('h');
	}
	else {
		intepretedString += momentItem.format('h:mm');
	}
	return intepretedString;
};

ScheduleCard.defaultProps = {
	firstYetToHappenCardIndex: 2,
};

ScheduleCard.propTypes = {
	coursesToShow: PropTypes.arrayOf(PropTypes.object).isRequired,
	actionButton: PropTypes.element.isRequired,
	onClickCourse: PropTypes.func.isRequired,
	activeCourse: PropTypes.number.isRequired,
	firstYetToHappenCardIndex: PropTypes.number
};

export default ScheduleCard;
