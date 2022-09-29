import { store as celesteStore } from '@celeste-js/store';
import { addressBook } from 'celeste.config';

import { mintType2MethodName as mintTypes } from 'src/static/constants';

class MintProxy {
    #contractRead;
    #contractWrite;

    constructor() {
        const { web3Reducer } = celesteStore.getState();
        this.#contractRead = web3Reducer.contracts['CDJS_MINT_READ.4'];

        if (web3Reducer.initialized) this.#contractWrite = web3Reducer.contracts['CDJS_MINT.4'];
    }

    read() {
        return {
            mintData: async type => {
                const result = await this.#contractRead.methods[type](addressBook.ZERO).call();
                return result;
            },
        };
    }

    write() {
        return {
            mint: async ({ type, amount, price }, { from }) => {
                const tx = await this.#contractWrite.methods[type]();

                const result = new Promise((resolve, reject) => {
                    try {
                        const txRes = tx.send({ from, value: amount * price });
                        resolve(txRes);
                    } catch (err) {
                        reject(err);
                    }
                });

                return result;
            },
        };
    }
}

export default MintProxy;
