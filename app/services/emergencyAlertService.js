const AppSettings = require('../AppSettings');

const EmergencyAlertService = {
	FetchEmergencyAlerts() {
		return fetch(AppSettings.EMERGENCY_ALERT_API_URL, {
			headers: {
				'Cache-Control': 'no-cache'
			}
		})
		.then((response) => response.json())
		.then((response) => {
			console.log("TESTING")
			console.log(response);
		})
		.catch((err) => {
			console.log('Error fetching quicklinks' + err);
			return null;
		});
	}
};

export default EmergencyAlertService;
