const AppSettings = require('../AppSettings');

const EmergencyAlertService = {
	FetchQuicklinks() {
		return fetch(AppSettings.QUICKLINKS_API_URL, {
			headers: {
				'Cache-Control': 'no-cache'
			}
		})
		.then((response) => response.json())
		.catch((err) => {
			console.log('Error fetching quicklinks' + err);
			return null;
		});
	}
};

export default EmergencyAlertService;
