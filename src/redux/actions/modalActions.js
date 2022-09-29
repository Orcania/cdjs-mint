import { OPEN_MODAL, CLOSE_MODAL } from '../constants';

export const open_modal = ({ modalName, modalData }) => ({ type: OPEN_MODAL, payload: { modalName, data: modalData } });
export const close_modal = () => ({ type: CLOSE_MODAL });
