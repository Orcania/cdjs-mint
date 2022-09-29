import { store as celesteStore } from '@celeste-js/store';

class Erc721Proxy {
    #contractRead;

    constructor() {
        const { web3Reducer } = celesteStore.getState();
        this.#contractRead = web3Reducer.contracts['CDJS_ERC721_READ.4'];
    }

    read() {
        return {
            totalSupply: async () => {
                const totalSupply = await this.#contractRead.methods.totalSupply().call();
                return totalSupply;
            },
        };
    }
}

export default Erc721Proxy;
