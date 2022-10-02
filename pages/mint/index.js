/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useCelesteSelector } from '@celeste-js/react';

import { addressBook } from 'celeste.config';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import MintForm from 'src/sumcomponents/mint/form';

import Mintcard from 'src/components/commons/internal/mint-card';

import MintProxy from 'src/sc-proxies/mint';

import { mintType2MethodName as mintTypes } from 'src/static/constants';

import mintLists from 'src/static/mint-lists';

const { gl } = mintLists;

const mintDataStruct = {
    active: false,
    price: '',
    userMintLimit: '',
    userMints: '',
};

const mintDataBase = [
    {
        id: 1,
        title: 'VIP List',
        premintDate: 'Oct. 2nd, 2022 @ 3:00PM UTC',
        dateTimestamp: 1664722800000,
        // dateTimestamp: 1664696440000,
        price: '80000000000000000',
        userMintLimit: 15,
        list: gl,
    },
    // {
    //     id: 2,
    //     title: 'Guest List',
    //     premintDate: 'TBA',
    //     dateTimestamp: null,
    //     price: 1,
    //     userMintLimit: 10,
    //     list: wl,
    // },
    // {
    //     id: 3,
    //     title: 'Public',
    //     premintDate: 'TBA',
    //     dateTimestamp: null,
    //     price: 3,
    //     userMintLimit: 20,
    // },
];

const MintPage = () => {
    const { web3Reducer, walletReducer } = useCelesteSelector(state => state);

    const [smartContractState, setSmartContractState] = useState({
        totalSupply: 1000,
        totalMints: 0,
    });

    const [mintDataState, setMintDataState] = useState({
        gl: {
            ...mintDataStruct,
            ...mintDataBase[0],
        },
        // wl: {
        //     ...mintDataBase[1],
        //     ...mintDataStruct,
        // },
        // pm: {
        //     ...mintDataBase[2],
        //     ...mintDataStruct,
        // },
    });

    const [loading, setLoading] = useState(false);
    const [triggerVar, setTriggerVar] = useState(0);
    const [fetching, setFetching] = useState(false);

    const onMintCallback = () => {
        setTriggerVar(triggerVar + 1);
    };

    const fetchMintData = async () => {
        // wait until fetching is done before executing code below

        setLoading(true);
        setFetching(true);

        const mintProxy = new MintProxy();

        const mintRead = mintProxy.read();

        const address = walletReducer.isLoggedIn ? walletReducer.address : addressBook.ZERO;

        const glDataRes = await mintRead.mintData(mintTypes.gl, address);
        // const wlDataRes = await mintRead.mintData(mintTypes.wl, address);
        // const pubDataRes = await mintRead.mintData(mintTypes.pm, address);

        const glData = {
            ...mintDataBase[0],
            ...glDataRes,
        };

        // const wlData = {
        //     ...mintDataBase[1],
        //     ...wlDataRes,
        //     price: wlDataRes.active ? wlDataRes.price : null,
        // };

        // const pubData = {
        //     ...mintDataBase[2],
        //     ...pubDataRes,
        //     price: pubDataRes.active ? pubDataRes.price : null,
        // };

        setMintDataState({
            gl: glData,
            // wl: wlData,
            // pm: pubData,
        });

        setLoading(false);
        setFetching(false);
    };

    // wait until a fetch request is made before fetching data again

    useEffect(() => {
        if (!web3Reducer.readonly_initialized) return;

        (async () => {
            const mintProxy = new MintProxy();

            const mintRead = mintProxy.read();

            const totalSupply = +(await mintRead.maxSupply()) + 1;
            const totalMints = +(await mintRead.totalMints());

            setSmartContractState({
                totalSupply,
                totalMints,
            });
        })();
    }, [web3Reducer.readonly_initialized]);

    useEffect(() => {
        if (!web3Reducer.initialized || walletReducer.address === null) return;

        if (fetching) {
            setTimeout(() => {
                setTriggerVar(triggerVar + 1);
            }, 200);
            return;
        }

        fetchMintData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3Reducer.initialized, walletReducer.address, triggerVar]);

    return (
        <div className="bg-mint has-bg-hdark " style={{ minHeight: '100vh', padding: '100px 2rem' }}>
            {/* <video autoPlay muted loop id="mydiviivivividioe" className="bg-video">
                <source
                    src="https://uploads-ssl.webflow.com/622915b1c38ba539c4ab4bbe/62a66f959422e65c43e37c56_Cdjs-web-video-v5-transcode.mp4"
                    type="video/mp4"
                />
            </video> */}
            <div className="container">
                <div className="columns is-variable is-5 is-vcentered">
                    <div className="column is-4">
                        <figure className="image is-1by1">
                            <img
                                src="https://chaotic-develop.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnft.5c32de51.png&w=750&q=75"
                                alt=""
                            />
                        </figure>
                    </div>

                    {Object.keys(mintDataState).map(key => (
                        <>
                            <div key={key} className="column ">
                                <Mintcard
                                    mintData={mintDataState[key]}
                                    loading={loading}
                                    mintType={key}
                                    onMint={onMintCallback}
                                    scData={smartContractState}
                                />
                            </div>
                            <div className="column has-text-white">
                                {smartContractState.totalMints < smartContractState.totalSupply ? (
                                    <MintForm
                                        userMintLimit={+mintDataState[key].userMintLimit}
                                        price={mintDataState[key].price}
                                        userMints={+mintDataState[key].userMints}
                                        mintType={key}
                                        onMint={onMintCallback}
                                        active={mintDataState[key].active}
                                        mintDate={mintDataState[key].dateTimestamp}
                                        list={mintDataState[key].list}
                                    />
                                ) : (
                                    <div className="has-text-centered">
                                        <h1 className="title is-6 has-text-white has-text-centered">Mint</h1>
                                        <h1 className="title is-5 has-text-white">
                                            VIP Mint is now Sold Out. Stay tuned for the next Pre-Mint opening
                                        </h1>
                                    </div>
                                )}
                            </div>
                        </>
                    ))}

                    {/* {Object.keys(mintDataState).map(key => {
                        return (
                            <div key={key} className="column is-4">
                                <Mintcard
                                    mintData={mintDataState[key]}
                                    loading={loading}
                                    mintType={key}
                                    onMint={onMintCallback}
                                />
                            </div>
                        );
                    })} */}
                </div>
            </div>
        </div>
    );
};

MintPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Mint');

export default MintPage;
