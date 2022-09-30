/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from '@celeste-js/react';
import { useSelector, useDispatch } from 'react-redux';

import { close_modal } from 'src/redux/actions/modalActions';

import { Dialog } from 'primereact/dialog';
// import { onConnectError } from 'src/static/notifications-functions';

import wallets from 'src/static/wallets-list';

import modals from 'src/static/app.modals';

const WalletsModal = () => {
    // app state
    const dispatch = useDispatch();
    const walletsModal = useSelector(state => state.modalReducer[modals.WALLETSMODAL]);

    const closeModal = () => dispatch(close_modal());

    return (
        <Dialog
            visible={walletsModal.isOpen}
            header="Select wallet"
            onHide={closeModal}
            draggable={false}
            className="resize-manager"
        >
            <div>
                <ul className="coolscroll-small">
                    {wallets.map(wallet => (
                        <li className="py-2" key={wallet.id}>
                            <ConnectButton
                                className="button is-fullwidth has-bg-hdark has-border-radius-8 is-borderless has-hover-animated-gradient is-clickable "
                                providerType={wallet.provider}
                                onSuccessCB={closeModal}
                                onErrorCB={err => console.log(err)}
                                type="button"
                                style={{ height: '100%' }}
                            >
                                <div
                                    className="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between"
                                    style={{ width: '100%' }}
                                >
                                    <figure className="image is-48x48 mx-4 is-flex">
                                        <img src={wallet.logo} alt="" />
                                    </figure>

                                    <h1 className="subtitle is-5 has-text-white mx-2">{wallet.name}</h1>
                                </div>
                            </ConnectButton>
                        </li>
                    ))}
                </ul>
            </div>
        </Dialog>
    );
};

export default WalletsModal;
