/* eslint-disable jsx-a11y/label-has-associated-control */

import { useSelector, useDispatch } from 'react-redux';
import { start_close_modal } from 'src/redux/actions/modalActions';

import Modal from 'src/components/commons/modal';

const ExampleModal = () => {
    // redux
    const { exampleModal } = useSelector(state => state.modalReducer);
    const { data } = exampleModal;

    const dispatch = useDispatch();

    const handleCloseClick = () => {
        dispatch(start_close_modal());
    };

    return (
        <Modal isOpen={exampleModal.isOpen}>
            <div className="box has-background-dark p-5 has-border-2-hblue-o-2">
                <div className="container">
                    <h1 className="subtitle has-text-hpurple">Modal</h1>
                    <hr className="has-background-hblue-o-2" style={{ margin: '0 -24px 0 -24px' }} />
                    <section className="pt-5 mb-6">
                        <p className="has-text-hpurple">{data && data.msg}</p>
                    </section>

                    <div className="has-text-centered">
                        <button className="button  is-white" type="button" onClick={handleCloseClick}>
                            close
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ExampleModal;
