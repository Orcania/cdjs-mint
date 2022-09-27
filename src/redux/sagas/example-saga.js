/* eslint-disable camelcase */
import { put, takeLatest } from 'redux-saga/effects';
// import apiCall from 'src/api';

// import { Store as NotificationsStore } from 'react-notifications-component';
// import { successNotification } from 'src/static/notifications';

import { SET_VAR } from '../constants';

function* dispatch_notification() {
    // NotificationsStore.addNotification(successNotification('with saga side effects!', 'restarting in 2 secs'));

    yield setTimeout(() => {
        put({ type: SET_VAR, payload: 'hello world!' });
    }, 2000);

    // try {

    //     // yield put({ type: POKEMON_FETCH_SUCCESS, payload: res.data });
    // } catch (err) {
    //     // yield put({ type: POKEMON_FETCH_FAILURE, payload: err });
    // }
}

export default function* pokemons() {
    yield takeLatest(SET_VAR, dispatch_notification);
}
