import { useEffect, useState } from 'react';
import { useCelesteSelector } from '@celeste-js/react';

import { addressBook } from 'celeste.config';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import Mintcard from 'src/components/commons/internal/mint-card';

import MintProxy from 'src/sc-proxies/mint';

import { mintType2MethodName as mintTypes } from 'src/static/constants';

import mintLists from 'src/static/mint-lists';

const { gl, wl } = mintLists;

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
        // dateTimestamp: 1664722800000,
        dateTimestamp: 1664571307000,
        price: 2,
        userMintLimit: 15,
        list: gl,
    },
    {
        id: 2,
        title: 'Guest List',
        premintDate: 'TBA',
        dateTimestamp: null,
        price: 1,
        userMintLimit: 10,
        list: wl,
    },
    {
        id: 3,
        title: 'Public',
        premintDate: 'TBA',
        dateTimestamp: null,
        price: 3,
        userMintLimit: 20,
    },
];

const MintPage = () => {
    const { web3Reducer, walletReducer } = useCelesteSelector(state => state);

    const [mintDataState, setMintDataState] = useState({
        gl: {
            ...mintDataBase[0],
            ...mintDataStruct,
        },
        wl: {
            ...mintDataBase[1],
            ...mintDataStruct,
        },
        pm: {
            ...mintDataBase[2],
            ...mintDataStruct,
        },
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
        const wlDataRes = await mintRead.mintData(mintTypes.wl, address);
        const pubDataRes = await mintRead.mintData(mintTypes.pm, address);

        const glData = {
            ...mintDataBase[0],
            ...glDataRes,
        };

        const wlData = {
            ...mintDataBase[1],
            ...wlDataRes,
            price: wlDataRes.active ? wlDataRes.price : null,
        };

        const pubData = {
            ...mintDataBase[2],
            ...pubDataRes,
            price: pubDataRes.active ? pubDataRes.price : null,
        };

        setMintDataState({
            gl: glData,
            wl: wlData,
            pm: pubData,
        });

        setLoading(false);
        setFetching(false);
    };

    // wait until a fetch request is made before fetching data again

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
        <div className="has-bg-hdark-o-9" style={{ minHeight: '100vh', padding: '100px 2rem' }}>
            <div className="container">
                <div className="columns is-variable is-5">
                    {Object.keys(mintDataState).map(key => {
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
                    })}
                </div>
            </div>
        </div>
    );
};

MintPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Mint');

export default MintPage;
