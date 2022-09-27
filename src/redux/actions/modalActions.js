import { OPEN_MODAL, PLAY_CLOSE_ANIMATION, CLOSE_MODAL } from '../constants';

export const open_modal = ({ modalName, modalData }) => ({ type: OPEN_MODAL, payload: { modalName, data: modalData } });
export const start_close_modal = () => ({ type: PLAY_CLOSE_ANIMATION });
export const close_modal = () => ({ type: CLOSE_MODAL });
