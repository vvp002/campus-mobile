'use strict';

exports.handler = function(event, context) {
	var request = require('request');
	var EMERGENCY_ALERTS_MASTER = 'https://s3-us-west-2.amazonaws.com/ucsd-mobile/test/emergency-alert_emergency.json';

    request(EMERGENCY_ALERTS_MASTER, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                var data = JSON.parse(body);
                if (data['emergencyStatus']) {
                    if (context) {
                        context.succeed(data)
                    } else {
                        console.log(data)
                    }
                }
            } catch(err) {
                if (context) {
                    context.succeed(null)
                }
            }
        } else {
            if (context) {
                context.succeed(null)
            }
        }
    });
};

try {
	context;
} catch(err) {
	exports.handler(null, null);
}