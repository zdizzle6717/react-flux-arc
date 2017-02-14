import AppDispatcher from '../dispatcher';
import ContactConstants from '../constants/ContactConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'contact:change';

let _contacts = [];
let _contact = {};

function setContacts(contacts) {
	if (contacts) {
		_contacts = contacts;
	}
}

function setContact(contact) {
	if (contact) {
		_contact = contact;
	}
}

function removeContact(id) {
	let index = _contacts.findIndex((contact) => contact.id === id);

	if (index !== -1) {
		_contacts.splice(index, 1);
	}
	return _contacts;
}

class ContactStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getContacts() {
        return _contacts;
    }

    getContact() {
        return _contact;
    }


}

const ContactStore = new ContactStoreClass();

ContactStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
		case ContactConstants.GET_CONTACT:
            setContact(action.contact);
            ContactStore.emitChange();
            break;

        case ContactConstants.GET_CONTACTS:
            setContacts(action.contacts);
            ContactStore.emitChange();
            break;
			
        case ContactConstants.CREATE_CONTACT:
            setContact(action.contact);
            ContactStore.emitChange();
            break;

        case ContactConstants.UPDATE_CONTACT:
            setContact(action.contact);
            ContactStore.emitChange();
            break;

        case ContactConstants.REMOVE_CONTACT:
            removeContact(action.id);
            ContactStore.emitChange();
            break;

        default:
    }

});

export default ContactStore;
