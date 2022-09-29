import modals from 'src/static/app.modals';
import { OPEN_MODAL, CLOSE_MODAL } from '../constants';

const defaultModaStructure = {
    isOpen: false,
    data: null,
};

const defaultState = {
    exampleModal: { ...defaultModaStructure },
    currentModal: '',
};

Object.values(modals).forEach(modal => {
    defaultState[modal] = { ...defaultModaStructure };
});

// eslint-disable-next-line default-param-last
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                [action.payload.modalName]: { isOpen: true, data: action.payload.data },
                currentModal: action.payload.modalName,
            };

        case CLOSE_MODAL:
            return {
                ...defaultState,
            };

        default:
            return { ...state };
    }
};

export default reducer;
