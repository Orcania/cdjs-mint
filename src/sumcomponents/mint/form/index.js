import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ConnectedWrapper, NetworkWrapper, SwitchNetworkButton, useCelesteSelector } from '@celeste-js/react';

import MintProxy from 'src/sc-proxies/mint';
import { open_modal } from 'src/redux/actions';
import modals from 'src/static/app.modals';
import { toast } from 'react-toastify';
import { rpcs } from 'celeste.config';

const MintForm = ({ userMintLimit, price, userMints, onMint }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const { walletReducer } = useCelesteSelector(state => state);

    const [mintAmount, setMintAmount] = useState(1);

    const handleDecrease = () => {
        if (mintAmount > 1) setMintAmount(mintAmount - 1);
    };

    const handleIncrease = () => {
        if (mintAmount < userMintLimit || mintAmount + userMints <= userMintLimit) setMintAmount(mintAmount + 1);
    };

    const handleMintClick = async () => {
        const mintProxy = new MintProxy().write();

        setLoading(true);
        try {
            const tx = await mintProxy.mint({ type: 'wlMint', amount: 1, price }, { from: walletReducer.address });
            const txnHash = tx.transactionHash;

            const toastContent = () => (
                <div>
                    <p>
                        Txs successfull{' '}
                        <a href={`${rpcs.ETH.explorer}/tx/${txnHash}`} target="_blank" rel="noreferrer">
                            View on Etherscan
                        </a>
                    </p>
                </div>
            );

            onMint();

            toast.success(toastContent, {
                closeOnClick: false,
                pauseOnHover: true,
            });
        } catch (err) {
            toast.error('Something went wrong while trying to mint your NFT. Please try again.');
            // eslint-disable-next-line no-console
            console.log(err);
        }
        setLoading(false);
    };

    const handleOpenWalletsModal = () => {
        dispatch(open_modal({ modalName: modals.WALLETSMODAL }));
    };

    return (
        <div className="columns">
            <div className="column" />
            <div className="column">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                >
                    <h1 className="title is-6 has-text-white has-text-centered">Mint</h1>

                    <div className="field">
                        <div className="mint_buttons has-text-centered">
                            <button
                                className="mint_button button is-hblue mx-1"
                                type="button"
                                disabled={mintAmount === 1}
                                onClick={handleDecrease}
                            >
                                -
                            </button>
                            <input
                                className="input  has-bg-hblue-o-2 has-text-white has-border-2-hwhite-o-10"
                                value={mintAmount}
                                style={{ width: '100px' }}
                            />
                            <button
                                className="mint_button button is-hblue mx-1"
                                type="button"
                                disabled={mintAmount + userMints >= userMintLimit}
                                onClick={handleIncrease}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="info">
                        <div className="field">
                            <h1 className="has-text-white has-text-centered">Total: 0.00 ETH</h1>
                        </div>
                    </div>

                    <div className="field  has-text-centered">
                        <div className="control " style={{ display: 'grid', placeItems: 'center' }}>
                            <ConnectedWrapper
                                disconnectedComponent={
                                    <button
                                        className="button is-fullwidth is-hblue"
                                        type="button"
                                        style={{ width: '200px' }}
                                        onClick={handleOpenWalletsModal}
                                    >
                                        Connect wallet
                                    </button>
                                }
                            >
                                <NetworkWrapper
                                    info={
                                        <SwitchNetworkButton
                                            chainId={4}
                                            className="button is-fullwidth is-hblue"
                                            type="button"
                                            style={{ width: '200px' }}
                                            onErrorCB={() => {}}
                                        >
                                            Change to ETH chain
                                        </SwitchNetworkButton>
                                    }
                                >
                                    <button
                                        className={`button is-fullwidth is-hblue ${loading ? 'is-loading' : ''}`}
                                        type="button"
                                        style={{ width: '200px' }}
                                        onClick={handleMintClick}
                                        // disabled={userMints >= userMintLimit}
                                    >
                                        Mint
                                    </button>
                                </NetworkWrapper>
                            </ConnectedWrapper>
                        </div>
                    </div>
                </form>
            </div>
            <div className="column" />
        </div>
    );
};

export default MintForm;
