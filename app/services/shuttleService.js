var AppSettings = 		require('../AppSettings');
var shuttle_routes = 	require('../json/shuttle_routes_master.json');

var ShuttleService = {

	FetchShuttleArrivalsByStop: function(stopID, routes) {
		const SHUTTLE_STOPS_API_URL = AppSettings.SHUTTLE_STOPS_API_URL + stopID + '/arrivals';

		return fetch(SHUTTLE_STOPS_API_URL, {
			method: 'GET',
			headers: {
				'Accept' : 'application/json',
				'Cache-Control': 'no-cache'
			}
		})
		.then((response) => {
			response = response.json();
			console.log("Routes: " + routes);
			console.log("Stop: " + stopID);
			// No Response
			//if(response == []) {
			response = [];
			if(true) {
				for(var i = 0; i < routes.length; ++i) {
					// Find right route
					for(var j = 0; j < shuttle_routes.length; ++j) {
						console.log(shuttle_routes[j].id);
						// Find right stop
						if(shuttle_routes[j].id === routes[i]) {
							for(k = 0; k < shuttle_routes[j].stops.length; ++k) {
								if(shuttle_routes[j].stops[k].id === stopID) {
									// Calculate secondsToArrival
									var currentdate = new Date();
									var hours = currentdate.getHours();
									var mins = currentdate.getMinutes();
									var minsInHour = 60;
									var currenttime = minsInHour*hours + mins;
									currenttime = parseInt(currenttime);

									var secondsToArrival = 0;

									// Check weekday or weekend
									var schedule = shuttle_routes[j].stops[k].schedule.weekday;
									//console.log(schedule);
									// Loop through scedule to find closest arrival time
									for(var x = 0; x < schedule.length; ++x) {
										if(schedule[x] > currenttime) {
											secondsToArrival = 60* (schedule[x] - currenttime);
											console.log("SECONDS: " + secondsToArrival);
											break;
										}
									}

									var routeStop = {
										route: {
											color: shuttle_routes[j].color,
											id: shuttle_routes[j].id,
											name: shuttle_routes[j].name,
											shortName: shuttle_routes[j].shortName,
										},
										secondsToArrival: secondsToArrival
									};
									console.log("push");
									response.push(routeStop);
									break;
								}
							}
						}
					}
				}
			}
			return response;
		});
	}
}

export default ShuttleService;
