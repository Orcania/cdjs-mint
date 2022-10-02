import { useEffect, useState } from 'react';
import { useCelesteSelector, useCeleste } from '@celeste-js/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Dialog } from 'primereact/dialog';

import modals from 'src/static/app.modals';

import { open_modal, close_modal } from 'src/redux/actions';

// import { errorNotification } from 'src/static/notifications';

import { BigNum2NormalNum } from 'src/utils';
import { rpcs } from 'celeste.config';

const getAddressReduced = address => `${address.slice(0, 6)}...${address.slice(-4)}`;

const WalletAccountModal = () => {
    const celeste = useCeleste();

    const dispatch = useDispatch();
    const walletAccountModal = useSelector(state => state.modalReducer[modals.WALLETACCOUNT]);

    const { web3Reducer, walletReducer } = useCelesteSelector(state => state);

    const [balance, setBalance] = useState(0);

    const handleCloseClick = () => {
        dispatch(close_modal());
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(walletReducer.address);
        toast.info('Address copied to clipboard');
    };

    const handleOpenExplorer = () => {
        window.open(`${rpcs.ETH.explorer}/address/${walletReducer.address}`, '_blank');
    };

    const handleDisconnectClick = async () => {
        try {
            await celeste.requestDisconnection();
            dispatch(open_modal({ modalName: modals.walletsModal }));
        } catch (error) {
            toast.error('Something went wrong while disconnecting wallet');
        }

        handleCloseClick();
    };

    useEffect(() => {
        if (!web3Reducer.initialized || walletReducer.address === null) return;

        (async () => {
            const web3 = web3Reducer.web3readonly['1'];
            const currencyBalance = await web3.eth.getBalance(walletReducer.address);
            setBalance(currencyBalance);

            // const currencyBalanceBN = await web3.eth.getBalance(walletReducer.address);
            // const currencyBalance = web3.utils.fromWei(currencyBalanceBN.toString(), 'ether');
            // // truncate number to 5 decimal places
            // const currencyBalanceTruncated = Number(currencyBalance).toFixed(5).toString();
            // setBalance(currencyBalanceTruncated);
        })();

        // const currentBalance = web3.utils.fromWei(web3.eth.getBalance(walletReducer.address).toString(), 'ether');
        // setBalance(currentBalance);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletReducer.address, web3Reducer.initialized]);

    return (
        <Dialog
            visible={walletAccountModal.isOpen}
            header="Account"
            onHide={handleCloseClick}
            className="resize-manager "
            draggable={false}
            modal
        >
            <div>
                {/* <div className={background} /> */}
                <div className="box has-bg-hdark" style={{ position: 'relative' }}>
                    <div className="columns is-mobile" style={{ zIndex: '50' }}>
                        <div className="column is-narrow">
                            <h1 className="subtitle has-text-white">
                                {walletReducer.address && getAddressReduced(walletReducer.address)}
                            </h1>
                        </div>

                        <div className="column is-narrow">
                            <button className=" unstyled-button has-text-white" type="button" onClick={handleCopyClick}>
                                <span className="icon">
                                    <i className="fa-regular fa-clone" />
                                </span>
                            </button>
                        </div>

                        <div className="column is-narrow">
                            <button
                                className=" unstyled-button has-text-white"
                                type="button"
                                onClick={handleOpenExplorer}
                            >
                                <span className="icon">
                                    <i className="fa-regular fa-arrow-up-right-from-square" />
                                </span>
                            </button>
                        </div>

                        <div className="column has-text-right">
                            <button
                                className=" unstyled-button has-text-white"
                                type="button"
                                onClick={handleDisconnectClick}
                            >
                                <span className="icon">
                                    <i className="fa-regular fa-arrow-right-from-bracket" />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <h1 className="subtitle is-5 has-text-hwhite">Balance</h1>
                        <h1 className="title has-text-white">
                            <span className=" has-font-ptmono">${BigNum2NormalNum(balance, 18, 5)}</span> ETH
                        </h1>
                    </div>
                </div>

                <hr className="has-background-hw-o-3" />

                {/* <div>
                                        <h1 className="subtitle is-5 has-text-hw-o-8 has-text-centered">
                                            Transactions
                                        </h1>
                                    </div> */}
            </div>
        </Dialog>
    );
};

export default WalletAccountModal;
