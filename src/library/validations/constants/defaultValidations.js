'use strict';

export default {
	'address': {
		'regex': /^(?:[^|~%<>@$*+={}:;]*)$/,
		'message': 'Invalid characters'
	},
	'allCharacters': {
		'regex': /^(?:[^|~"]*)$/,
		'message': 'Invalid characters'
	},
	'bankNumber': {
		'regex': /^(?:[0-9\-]{4,17})$/,
		'message': 'Invalid bank number'
	},
	'city': {
		'regex': /^[a-zA-Z\.\-' ]*$/,
		'message': 'Invalid City Characters'
	},
	'currency': {
		'regex': /^(\d*)(\.{1}\d{0,2})?$/,
		'message': 'Invalid Currency Format'
	},
	'date': {
		'regex': /$^|^\d{2}\/\d{2}\/\d{4}$/,
		'message': 'Invalid Date Format'
	},
	'domesticFax': {
		'regex': /^$|^(([+]?1[ -.]?)?[(]?[2-9]\d{2}[)]?[ -.]?[1-9]\d{2}[ -.]?\d{4}([ ]?((x)|(ext[.]?)|(extension))[ .]?\d+)?)?$/,
		'message': 'Invalid fax number'
	},
	'domesticPhone': {
		'regex': /^$|^(([+]?1[ -.]?)?[(]?[2-9]\d{2}[)]?[ -.]?[1-9]\d{2}[ -.]?\d{4}([ ]?((x)|(ext[.]?)|(extension))[ .]?\d+)?)?$/,
		'message': 'Invalid phone number'
	},
	'ein': {
		'regex': /^\d{2}[-]?\d{7}$/,
		'message': 'Invalid EIN'
	},
	'email': {
		'regex': /^((\w{1}[\w'-\._]{0,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|([\w-]+\.)+)([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)){1})?$/,
		'message': 'Invalid Email Address',
	},
	'foreignPhone': {
		'regex': /^[+]?(((\d+)|(([(]{1}\d+[)]{1})))[ -.]?)+$/,
		'message': 'Invalid Foreign Phone number'
	},
	'fullname': {
		'regex': /^[a-zA-Z\-'. ]*$/,
		'message': 'Invalid Text Format'
	},
	'lastName': {
		'regex': /^[a-zA-Z\-' .,]*$/,
		'message': 'Invalid Name Format'
	},
	'lettersOnly': {
		'regex': /^[a-zA-Z]*$/,
		'message': 'No numbers or special characters'
	},
	'match': {
		'message': 'Input does not match'
	},
	'name': {
		'regex': /^[a-zA-Z\-' ]*$/,
		'message': 'Invalid Name Format'
	},
	'nonNegative': {
		'regex': /^[0-9][1-9]?/,
		'message': 'Negative numbers are not allowed.'
	},
	'noSpecialCharacters': {
		'regex': /^(?:[^|~"%<>#@$()*+={}:;]*)$/,
		'message': 'No special characters allowed'
	},
	'numbersOnly': {
		'regex': /^[0-9]*$/,
		'message': 'Numbers Only'
	},
	'password': {
		'regex': /^(?:((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[A-Za-z\d|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[a-z])(?=.*\d)(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[a-z\d|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[a-z])(?=.*[A-Z])(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[A-Za-z|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[A-Z])(?=.*\d)(?=.*[|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-])[A-Z\d|`~!@#$%^&*()_+={}\[\]:;"'<>,.?\/\-]{8,})|((?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}))$/,
		'message': 'Invalid Password Format'
	},
	'passwordSimple': {
		'regex': /[a-zA-Z0-9+ !@#$%^&*()]{6,}/,
		'message': 'Invalid Password Format'
	},
	'required': {
		'message': 'Required Field'
	},
	'routingNumber': {
		'regex': /^(?:((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|(80)){1}\d{7})$/,
		'message': 'Invalid Routing Number'
	},
	'ssn': {
		'regex': /$^|\b(?!000)(?!666)(?!9)[0-9]{3}[ -]?(?!00)[0-9]{2}[ -]?(?!0000)[0-9]{4}\b/,
		'message': 'Invalid SSN'
	},
	'title': {
		'regex': /^[a-zA-Z\/\\&' .,-]*$/,
		'message': 'Invalid Title Characters'
	},
	'username': {
		'regex': /^[a-zA-Z0-9_@.-]*$/,
		'message': 'Invalid Username'
	},
	'zipcode': {
		'regex': /^(?:\d{5}([-]{1}\d{4})?)$/,
		'message': 'Invalid Zip Code'
	}
};
