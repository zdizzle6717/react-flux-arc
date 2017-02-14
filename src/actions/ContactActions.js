'use strict';

import AppDispatcher from '../dispatcher';
import ContactConstants from '../constants/ContactConstants';
import ContactService from '../services/ContactService';

export default {
	getContact: (id) => {
        return ContactService
            .getContact(id).then(contact => {
				AppDispatcher.dispatch({
					actionType: ContactConstants.GET_CONTACT,
					contact: contact
				});
				return contact;
            });
    },

    getContacts: () => {
        return ContactService
            .getContacts()
            .then(contacts => {
                AppDispatcher.dispatch({
                    actionType: ContactConstants.GET_CONTACTS,
                    contacts: contacts
                });
				return contacts;
            });
    },

    searchContacts: (data) => {
        return ContactService
            .searchContacts(data)
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: ContactConstants.GET_CONTACTS,
                    contacts: response.results
                });
				return response;
            });
    },

	createContact: (data) => {
        return ContactService
            .createContact(data)
            .then(contact => {
                AppDispatcher.dispatch({
                    actionType: ContactConstants.CREATE_CONTACT,
                    contact: contact
                });
				return contact;
            });
    },

	updateContact: (id, data) => {
        return ContactService
            .updateContact(id, data)
            .then(contact => {
                AppDispatcher.dispatch({
                    actionType: ContactConstants.UPDATE_CONTACT,
                    contact: contact
                });
				return contact;
            });
    },

	removeContact: (id) => {
        return ContactService
            .removeContact(id)
            .then(contact => {
                AppDispatcher.dispatch({
                    actionType: ContactConstants.REMOVE_CONTACT,
                    id: id
                });
				return contact;
            });
    }
}
