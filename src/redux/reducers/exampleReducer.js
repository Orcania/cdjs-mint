/* eslint-disable default-param-last */

import { SET_VAR } from '../constants';

const defaultState = {
    storage: 'hello world!',
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_VAR:
            return {
                ...state,
                storage: action.payload,
            };

        default:
            return { ...state };
    }
};

export default reducer;
