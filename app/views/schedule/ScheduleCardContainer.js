import React from 'react';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';

import FullScheduleButton from './FullScheduleButton';
import ScheduleCard from './ScheduleCard';
import logger from '../../util/logger';

/**
 * Container component for [ScheduleCard]{@link ScheduleCard}
 * */
const dayToNum = {
	SU: 0,
	MO: 1,
	TU: 2,
	WE: 3,
	TH: 4,
	FR: 5,
	SA: 6,
	0: 'SU',
	1: 'MO',
	2: 'TU',
	3: 'WE',
	4: 'TH',
	5: 'FR',
	6: 'SA',
};

const processData = (scheduleData) => {
	if (!scheduleData) return [];

    let curDate = new Date();
    curDate.setDate(25)
    let date = curDate.toDateString();
    let weekDayNum = curDate.getDay();
    let weekDay = dayToNum[weekDayNum];
    console.log('current date is: ', date, 'day of week is: ', weekDay)
    console.log('scheduleData array is: ', scheduleData)
    console.log('Testing scheduleData access: ', scheduleData['MO'])

	let result = [];

	// Push all the classes to the results array, starting from the current day
	for (let i = 0; i < 7; i++) {
		result.push(...scheduleData[dayToNum[weekDayNum]]);
		weekDayNum = (weekDayNum+1) % 7;
	};

	// result.push(...scheduleData.MO);
	// result.push(...scheduleData.TU);
	// result.push(...scheduleData.WE);
	// result.push(...scheduleData.TH);
	// result.push(...scheduleData.FR);
    console.log('result array is: ', result)
	// result = result.slice(2, 6);


	return result;
};

class ScheduleCardContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			upcoming4Courses: processData(props.scheduleData),
			activeCourse: 0
		};
		this.onClickCourse = this.onClickCourse.bind(this);
	}

	componentWillMount() {
		logger.ga('Card Mounted: Schedule');
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.scheduleData) {
			// console.warn('receive new prop');
			this.setState((state, props) => ({
				...state,
				upcoming4Courses: processData(props.scheduleData)
			}));
		}
	}
	onClickCourse(newActiveCourse) {
		this.setState(prevState => ({
			...prevState,
			activeCourse: newActiveCourse,
		}));
		this.forceUpdate();
	}
	render() {
		return (
			<ScheduleCard
				onClickCourse={this.onClickCourse}
				// waitingData={this.state.courseDataReceived}
				coursesToShow={this.state.upcoming4Courses}
				activeCourse={this.state.activeCourse}
				actionButton={<FullScheduleButton />}
			/>
		);
	}
}

const mapStateToProps = state => ({
	scheduleData: state.schedule.data
});

export default connect(mapStateToProps)(ScheduleCardContainer);
