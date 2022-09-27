/* eslint-disable import/prefer-default-export */
import {
    SET_VAR
} from '../constants';

export const set_var = data => {
    return {
        type: SET_VAR,
        payload: data
    };
}