/* eslint-disable lines-between-class-members */
import { store as celesteStore } from '@celeste-js/store';
import BigNumber from 'bignumber.js';

class Erc721Proxy {
    #contractRead;
    #contractWrite;

    constructor() {
        const { web3Reducer } = celesteStore.getState();
        this.#contractRead = web3Reducer.contracts['CDJS_ERC721_READ.1'];

        // eslint-disable-next-line dot-notation
        if (web3Reducer.initialized) this.#contractWrite = web3Reducer.contracts['CDJS_ERC721'];
    }

    read() {
        return {
            pmData: async address => {
                const data = await this.#contractRead.methods.pmData(address).call();
                return data;
            },
            maxSupply: async () => {
                const res = await this.#contractRead.methods.maxSupply().call();
                return res;
            },
            totalSupply: async () => {
                const res = await this.#contractRead.methods.totalSupply().call();
                return res;
            },
        };
    }

    write() {
        return {
            mint: async ({ amount, price }, { from }) => {
                const tx = await this.#contractWrite.methods.pmMint();

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

export default Erc721Proxy;
