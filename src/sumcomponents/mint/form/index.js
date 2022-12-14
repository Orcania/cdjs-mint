import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';
import { toast } from 'react-toastify';
import { ConnectedWrapper, NetworkWrapper, SwitchNetworkButton, useCelesteSelector } from '@celeste-js/react';

import Erc721Proxy from 'src/sc-proxies/erc721';
import { open_modal } from 'src/redux/actions';
import { BigNum2NormalNum } from 'src/utils';
import modals from 'src/static/app.modals';
import { rpcs } from 'celeste.config';
import useCountdown from 'src/hooks/useCountdown';

const mintName = {
    gl: 'VIP List',
    wl: 'Guest List',
    pm: 'Public',
};

const MintForm = ({ userMintLimit, price, userMints, onMint, mintType, mintDate }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const { walletReducer } = useCelesteSelector(state => state);

    const [mintAmount, setMintAmount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(+price);
    const [userListed] = useState(true);

    // eslint-disable-next-line no-unused-vars
    const [_timeLeft, live] = useCountdown(mintDate);

    // useEffect(() => {
    //     if (mintType === 'pm') return;
    //     if (!web3Reducer.initialized || !walletReducer.address === null) return;
    //     if (!list) return;

    //     const listed = list.find(adrs => adrs.toLowerCase() === walletReducer.address.toLowerCase());

    //     setUserListed(listed);

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [web3Reducer.initialized, walletReducer.address, mintType]);

    const handleDecrease = () => {
        if (mintAmount > 1) setMintAmount(mintAmount - 1);
    };

    const handleIncrease = () => {
        if (mintAmount < userMintLimit || mintAmount + userMints <= userMintLimit) setMintAmount(mintAmount + 1);
    };

    const handleMintClick = async () => {
        const mintProxy = new Erc721Proxy().write();

        setLoading(true);
        try {
            const tx = await mintProxy.mint({ amount: mintAmount, price }, { from: walletReducer.address });
            const txnHash = tx.transactionHash;

            const toastContent = () => (
                <div>
                    <p>
                        <h1 className="subtitle is-6 has-text-success mb-0">
                            <span>Txs successfull</span>
                        </h1>{' '}
                        <a href={`${rpcs.ETH.explorer}/tx/${txnHash}`} target="_blank" rel="noreferrer">
                            View on Etherscan
                        </a>
                    </p>
                </div>
            );

            setMintAmount(1);

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

    const handleInputChange = e => {
        // regex check that there are not any symbols or letters or whitespace
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            // check inputed amount is less than userMints + userMintLimit

            if (+e.target.value <= userMintLimit - userMints) {
                setMintAmount(+e.target.value);
            }
        }
    };

    useEffect(() => {
        setTotalPrice(
            BigNumber(+price)
                .times(mintAmount)
                .toFixed(0)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mintAmount]);

    return (
        <div>
            <h1 className="title is-6 has-text-white has-text-centered">Mint</h1>

            {live ? (
                <>
                    <ConnectedWrapper>
                        <NetworkWrapper>
                            {userListed ? (
                                <>
                                    <div className="field">
                                        <div className="mint_buttons has-text-centered">
                                            <button
                                                className="mint_button button is-hdark2 has-text-white mx-1"
                                                type="button"
                                                disabled={mintAmount === 1}
                                                onClick={handleDecrease}
                                            >
                                                -
                                            </button>
                                            <input
                                                className="input has-text-white1 has-border-2-hwhite-o-10 has-bg-hdark has-text-white"
                                                value={mintAmount}
                                                style={{ width: '100px' }}
                                                onChange={handleInputChange}
                                            />
                                            <button
                                                className="mint_button button is-hdark2 has-text-white mx-1"
                                                type="button"
                                                disabled={mintAmount + userMints >= userMintLimit}
                                                onClick={handleIncrease}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <hr />
                                    <div className="info">
                                        <div className="field">
                                            <h1 className="has-text-white1 has-text-centered">
                                                Total: {+BigNum2NormalNum(totalPrice)} ETH
                                            </h1>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            ) : (
                                <h1 className="title is-6 has-text-white has-text-centered">
                                    You are not on the Whitelist, sorry
                                </h1>
                            )}
                        </NetworkWrapper>
                    </ConnectedWrapper>

                    <div className="field  has-text-centered">
                        <div className="control " style={{ display: 'grid', placeItems: 'center' }}>
                            <ConnectedWrapper
                                disconnectedComponent={
                                    <button
                                        className="button is-fullwidth is-hdark2 has-text-white"
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
                                            className="button is-fullwidth is-hdark2 has-text-white"
                                            type="button"
                                            style={{ width: '200px' }}
                                            onErrorCB={() => {}}
                                        >
                                            Change to ETH chain
                                        </SwitchNetworkButton>
                                    }
                                >
                                    {userListed ? (
                                        <>
                                            <div />
                                            {userMints >= userMintLimit ? (
                                                <button
                                                    className="button is-fullwidth is-hdark2 has-text-white1"
                                                    type="button"
                                                    style={{ width: '200px' }}
                                                    disabled
                                                >
                                                    mint limit reached
                                                </button>
                                            ) : (
                                                <button
                                                    className={`button is-fullwidth is-hdark2 has-text-white ${
                                                        loading ? 'is-loading' : ''
                                                    }`}
                                                    type="button"
                                                    onClick={handleMintClick}
                                                    disabled={
                                                        +mintAmount < 1 ||
                                                        mintAmount + userMints > userMintLimit ||
                                                        +mintAmount > userMintLimit
                                                    }
                                                >
                                                    Mint
                                                </button>
                                            )}
                                        </>
                                    ) : null}
                                </NetworkWrapper>
                            </ConnectedWrapper>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <h1 className="title is-6 has-text-white has-text-centered">
                        {' '}
                        {`${mintName[mintType]}`} mint has not started yet
                    </h1>
                </div>
            )}
        </div>
    );
};

export default MintForm;
