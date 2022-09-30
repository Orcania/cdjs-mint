/* eslint-disable lines-between-class-members */
import { store as celesteStore } from '@celeste-js/store';

import BigNumber from 'bignumber.js';

class MintProxy {
    #contractRead;
    #contractWrite;

    constructor() {
        const { web3Reducer } = celesteStore.getState();
        this.#contractRead = web3Reducer.contracts['CDJS_MINT_READ.4'];

        // eslint-disable-next-line dot-notation
        if (web3Reducer.initialized) this.#contractWrite = web3Reducer.contracts['CDJS_MINT'];
    }

    read() {
        return {
            mintData: async (type, address) => {
                const result = await this.#contractRead.methods[type](address).call();
                return result;
            },
        };
    }

    write() {
        return {
            mint: async ({ type, amount, price }, { from }) => {
                const tx = await this.#contractWrite.methods[type]();

                const value = new BigNumber(price).times(amount).toString();

                const result = new Promise((resolve, reject) => {
                    try {
                        const txRes = tx.send({ from, value });
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
