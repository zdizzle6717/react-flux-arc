import AppDispatcher from '../../../dispatcher';
import UserConstants from '../constants/UserConstants';
import { EventEmitter } from 'events';

export default function(roleConfig) {
	const CHANGE_EVENT = 'user:change';

	let _users = [];
	let _user = {};
	let _isAuthenticated = false;
	let _redirectRoute = '/';

	function setUsers(users) {
		if (users) {
			_users = users;
		}
	}

	function setUser(user) {
		if (user) {
			roleConfig.forEach((role) => {
				if (role.roleFlags === user.roleFlags) {
					user.roleConfig = role;
				}
			});
			if (!user.roleConfig) {
				throw new Error('Oops! Make sure that the roleConfig on the UI and API have matching values.');
			}
			_user = user;
			_isAuthenticated = true;
			sessionStorage.setItem('user', JSON.stringify(user));
		}
	}

	function logoutUser() {
		_user = {};
		_isAuthenticated = false;
		sessionStorage.removeItem('user');
		return _isAuthenticated;
	}

	function removeUser(id) {
		let index = _users.findIndex((user) => user.id === id);

		if (index !== -1) {
			_users.splice(index, 1);
		}
		return _users;
	}

	class UserStoreClass extends EventEmitter {

	    emitChange() {
	        this.emit(CHANGE_EVENT);
	    }

	    addChangeListener(callback) {
	        this.on(CHANGE_EVENT, callback);
	    }

	    removeChangeListener(callback) {
	        this.removeListener(CHANGE_EVENT, callback);
	    }

		setRedirectRoute(route) {
			_redirectRoute = route;
		}

		getRedirectRoute() {
			return _redirectRoute;
		}

	    getUsers() {
	        return _users;
	    }

	    getUser() {
	        return _user;
	    }

		checkAuthentication() {
			return _isAuthenticated;
		}

		checkAuthorization(accessControl) {
			let userFlags = _user.roleFlags || 0;
			let accessFlags = 0;
			accessControl.forEach((roleName) => {
				roleConfig.forEach((config) => {
					if (config.name === roleName) {
						accessFlags += config.roleFlags;
					}
				});
			});

			let hasFlags = function (flags, mask) {
				flags = parseInt(flags, 10);
				mask = parseInt(mask, 10);

				return (mask & flags) === mask;
			};

			let accessGranted = hasFlags(userFlags, accessFlags) && userFlags !== 0;

			return accessGranted;
		}

	}

	const UserStore = new UserStoreClass();
	UserStore.setMaxListeners(100);

	UserStore.dispatchToken = AppDispatcher.register(action => {

	    switch (action.actionType) {
	        case UserConstants.CREATE_USER:
	            setUser(action.user);
	            UserStore.emitChange();
	            break;

			case UserConstants.AUTHENTICATE_USER:
	            setUser(action.user);
	            UserStore.emitChange();
	            break;

			case UserConstants.SET_USER:
	            setUser(action.user);
	            UserStore.emitChange();
	            break;

			case UserConstants.LOGOUT_USER:
	            logoutUser();
	            UserStore.emitChange();
	            break;

			case UserConstants.GET_USER:
	            setUser(action.user);
	            UserStore.emitChange();
	            break;

	        case UserConstants.GET_USERS:
	            setUsers(action.users);
	            UserStore.emitChange();
	            break;

	        case UserConstants.UPDATE_USER:
	            setUser(action.user);
	            UserStore.emitChange();
	            break;

	        case UserConstants.REMOVE_USER:
	            removeUser(action.id);
	            UserStore.emitChange();
	            break;

	        default:
	    }

	});

	return UserStore;
}
