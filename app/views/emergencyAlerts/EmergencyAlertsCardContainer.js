import React from 'react';
import { connect } from 'react-redux';

import DataListCard from '../common/DataListCard';
import general from '../../util/general';
import logger from '../../util/logger';

const EmergencyAlertsCardContainer = ({ alertsData }) => {
    logger.ga('Card Mounted: Emergency Alerts');
    console.log("Emergency Alerts Container")
	return (
		<DataListCard
			id="emergencyAlerts"
			title="Links"
			data={alertsData}
			rows={4}
			item={'EmergencyAlertsItem'}
			cardSort={general.dynamicSort('card-order')}
		/>
	);
};

const mapStateToProps = (state) => (
	{
		alertsData: state.emergencyAlerts.data,
	}
);

const ActualEmergencyLinksCard = connect(
	mapStateToProps
)(EmergencyAlertsCardContainer);

export default ActualEmergencyLinksCard;
