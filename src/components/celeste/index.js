import CelesteJS from '@celeste-js/core';

import { CelesteStoreProvider, CelesteProvider } from '@celeste-js/react';

import celesteConfig from 'celeste.config';

const celeste = new CelesteJS(celesteConfig);

const CelesteComponent = ({ children }) => {
    return (
        <CelesteStoreProvider>
            <CelesteProvider celeste={celeste}>{children}</CelesteProvider>
        </CelesteStoreProvider>
    );
};

export default CelesteComponent;
