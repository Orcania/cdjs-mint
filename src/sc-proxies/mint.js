import { store as celesteStore } from '@celeste-js/store';
import { addressBook } from 'celeste.config';

import { mintType2MethodName as mintTypes } from 'src/static/constants';

class MintProxy {
    #contractRead;
    #contractWrite;

    constructor() {
        const { web3Reducer } = celesteStore.getState();
        this.#contractRead = web3Reducer.contracts['CDJS_MINT_READ.4'];
    }

    read() {
        return {
            mintData: async type => {
                const result = await this.#contractRead.methods[type](addressBook.ZERO).call();
                return result;
            },
        };
    }
}

export default MintProxy;
