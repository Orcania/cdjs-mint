import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';

import { BigNum2NormalNum } from 'src/utils';

import useCountdown from 'src/hooks/useCountdown';

import MintForm from 'src/sumcomponents/mint/form';
import { ConnectedWrapper, NetworkWrapper } from '@celeste-js/react';

const Mintcard = ({ mintData, loading }) => {
    const timeLeft = useCountdown(mintData.dateTimestamp || 0);
    return (
        <>
            <Card title={mintData.title} style={{ width: '90%' }} className="mint_card">
                <div className="has-text-centered">
                    <p>
                        <b>
                            Pre-mint Opening Date and Time: <br />
                            {mintData.premintDate}
                        </b>
                    </p>
                    <br />
                    <h2>
                        <b>Countdown:</b>
                    </h2>
                    <div>
                        {mintData.dateTimestamp ? (
                            <h1 className=" has-text-danger mb-0">
                                <b>
                                    <span>{timeLeft.D}</span>
                                    {' : '}
                                    <span>{timeLeft.H}</span>
                                    {' : '}
                                    <span>{timeLeft.M}</span>
                                    {' : '}
                                    <span>{timeLeft.S}</span>
                                </b>
                            </h1>
                        ) : (
                            <h1 className="subtitale is-6 mb-0">— : — : — : —</h1>
                        )}

                        <h1 className="subtitle is-6">
                            <span>D</span>
                            {' : '}
                            <span>H</span>
                            {' : '}
                            <span>M</span>
                            {' : '}
                            <span>S</span>
                        </h1>
                    </div>
                    <br />
                    {loading ? (
                        <ProgressSpinner style={{ width: '35px', height: '35px' }} />
                    ) : (
                        <>
                            <div>
                                <span>Price: </span>
                                <span>
                                    <b>{BigNum2NormalNum(mintData.price)} ETH</b>
                                </span>
                            </div>

                            <div>
                                <span>Mint Limit: </span>
                                <span>
                                    <b>{mintData.userMintLimit}</b>
                                </span>
                            </div>

                            <ConnectedWrapper>
                                <NetworkWrapper info={null}>
                                    <div>
                                        <span>Your mints: </span>
                                        <span>
                                            <b>{mintData.userMints}</b>
                                        </span>
                                    </div>
                                </NetworkWrapper>
                            </ConnectedWrapper>
                        </>
                    )}
                </div>
            </Card>
            <br />
            <MintForm userMintLimit={mintData.userMintLimit} price={mintData.price} />
        </>
    );
};

export default Mintcard;
