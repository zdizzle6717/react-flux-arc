'use strict';

import AppDispatcher from '../../../dispatcher';
import UserConstants from '../constants/UserConstants';
import UserService from '../services/UserService';

export default {
	create: (data) => {
        return UserService
            .create(data)
            .then(user => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.CREATE_USER,
                    user: user
                });
				return user;
            });
    },

	authenticate: (data) => {
        return UserService
            .authenticate(data)
            .then(user => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.AUTHENTICATE_USER,
                    user: user
                });
				return user;
            });
    },

	setUser: (data) => {
		AppDispatcher.dispatch({
			actionType: UserConstants.SET_USER,
			user: data
		});
    },

	logout: () => {
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGOUT_USER
		});
    },

	get: (id) => {
        return UserService
            .get(id).then(user => {
				AppDispatcher.dispatch({
					actionType: UserConstants.GET_USER,
					user: user
				});
				return user;
            });
    },

    getAll: () => {
        return UserService
            .getAll()
            .then(users => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.GET_USERS,
                    users: users
                });
				return users;
            });
    },

	update: (id, data) => {
        return UserService
            .update(id, data)
            .then(user => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.UPDATE_USER,
                    user: user
                });
				return user;
            });
    },

	remove: (id) => {
        return UserService
            .remove(id)
            .then(user => {
                AppDispatcher.dispatch({
                    actionType: UserConstants.REMOVE_USER,
                    id: id
                });
				return user;
            });
    }
}
