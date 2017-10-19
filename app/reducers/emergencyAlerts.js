const initialState = {
	data: null,
	lastUpdated: 0,
};

function emergencyAlerts(state = initialState, action) {
	const newState = { ...state };

	switch (action.type) {
	case 'SET_ALERTS': {
		newState.data = action.emergencyAlerts;
		newState.lastUpdated = new Date().getTime();

		return newState;
	}
	default:
		return state;
	}
}

module.exports = emergencyAlerts;
