import { useEffect, useState } from 'react';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import Mintcard from 'src/components/commons/internal/mint-card';

import MintProxy from 'src/sc-proxies/mint';

import { mintType2MethodName as mintTypes } from 'src/static/constants';
import { useCelesteSelector } from '@celeste-js/react';

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
    },
    {
        id: 2,
        title: 'Guest List',
        premintDate: 'TBA',
        dateTimestamp: null,
    },
    {
        id: 3,
        title: 'Public',
        premintDate: 'TBA',
        dateTimestamp: null,
    },
];

const MintPage = () => {
    const { web3Reducer, walletReducer } = useCelesteSelector(state => state);

    const [mintDataState, setMintDataState] = useState({
        wl: {
            ...mintDataBase[0],
            ...mintDataStruct,
        },
        gl: {
            ...mintDataBase[1],
            ...mintDataStruct,
        },
        pm: {
            ...mintDataBase[2],
            ...mintDataStruct,
        },
    });

    const [loading, setLoading] = useState(true);

    const fetchMintData = async () => {
        setLoading(true);

        const mintProxy = new MintProxy();

        const mintRead = mintProxy.read();

        const wlDataRes = await mintRead.mintData(mintTypes.wl, walletReducer.address);

        const glDataRes = await mintRead.mintData(mintTypes.gl, walletReducer.address);
        const pubDataRes = await mintRead.mintData(mintTypes.pm, walletReducer.address);

        const wlData = {
            ...mintDataBase[0],
            ...wlDataRes,
        };

        const glData = {
            ...mintDataBase[1],
            ...glDataRes,
        };

        const pubData = {
            ...mintDataBase[2],
            ...pubDataRes,
        };

        setMintDataState({
            wl: wlData,
            gl: glData,
            pm: pubData,
        });

        setLoading(false);
    };

    useEffect(() => {
        if (!web3Reducer.readonly_initialized) return;

        (async () => {
            await fetchMintData();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3Reducer.readonly_initialized, walletReducer.address]);

    return (
        <div className="has-bg-hdark-o-9" style={{ minHeight: '100vh', padding: '100px' }}>
            <div className="container">
                <div className="columns">
                    {Object.keys(mintDataState).map(key => {
                        return (
                            <div key={key} className="column is-4">
                                <Mintcard
                                    mintData={mintDataState[key]}
                                    loading={loading}
                                    mintType={key}
                                    onMint={fetchMintData}
                                />
                            </div>
                        );
                    })}
                </div>
                <hr />
            </div>
        </div>
    );
};

MintPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Mint');

export default MintPage;
