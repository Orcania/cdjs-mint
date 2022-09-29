import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ConnectedWrapper, NetworkWrapper, SwitchNetworkButton, useCelesteSelector } from '@celeste-js/react';

import MintProxy from 'src/sc-proxies/mint';
import { open_modal } from 'src/redux/actions';
import modals from 'src/static/app.modals';
import { toast } from 'react-toastify';

const MintForm = ({ userMintLimit, price }) => {
    const dispatch = useDispatch();

    const { walletReducer } = useCelesteSelector(state => state);

    const [mintAmount, setMintAmount] = useState(1);

    const handleDecrease = () => {};

    const handleIncrease = () => {};

    const handleMintClick = async e => {
        const mintProxy = new MintProxy().write();

        try {
            const tx = await mintProxy.mint({ type: 'pmMint', amount: 1, price }, { from: walletReducer.address });
        } catch (err) {
            toast.error('Something went wrong while trying to mint your NFT. Please try again.');
            console.log(err);
        }
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
                            <button className="mint_button button is-hblue mx-1" type="button">
                                -
                            </button>
                            <input
                                className="input  has-bg-hblue-o-2 has-text-white has-border-2-hwhite-o-10"
                                value={mintAmount}
                                style={{ width: '100px' }}
                            />
                            <button className="mint_button button is-hblue mx-1" type="button">
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
                                            onErrorCB={console.log}
                                        >
                                            Change to ETH chain
                                        </SwitchNetworkButton>
                                    }
                                >
                                    <button
                                        className="button is-fullwidth is-hblue"
                                        type="button"
                                        style={{ width: '200px' }}
                                        onClick={handleMintClick}
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
