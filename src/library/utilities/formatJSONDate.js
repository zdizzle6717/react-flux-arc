'use strict';

// NOTE: Returns a formatted date. 'timezone' and 'format' arguments are optional
// NOTE: Be aware of the timezone set for the current database

import moment from 'moment-timezone';

const formatDate = (input, timezone = 'Etc/GMT', format = 'D MMM YYYY') => {
	let output = moment.tz(input, _timezone).format('D MMM YYYY');
	return output;
}

export default formatDate;
