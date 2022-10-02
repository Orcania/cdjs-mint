const MintingABI = require('./src/static/abi/cdjs.json');
const ERC721ABI = require('./src/static/abi/erc721.json');

module.exports = {
    isMultichain: false,
    rpcs: {
        // ETH: {
        //     chainId: '4',
        //     url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        //     explorer: 'https://rinkeby.etherscan.io',
        // },

        ETH: {
            chainId: '1',
            url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            explorer: 'https://etherscan.io',
        },
    },
    smartContracts: [
        {
            key: 'CDJS_MINT',
            abi: MintingABI,
            address: '0x78f369B8DF89078F140b57f4718623C0533786D2',
        },
        {
            key: 'CDJS_ERC721',
            abi: ERC721ABI,
            address: '0x6aB274f926128A68562e9299F6b07Dc8Cc6A972f',
        },
    ],
    addressBook: {
        ZERO: '0x0000000000000000000000000000000000000000',
        CDJS_ERC721: '0x6aB274f926128A68562e9299F6b07Dc8Cc6A972f',
        CDJS_MINT: '0x78f369B8DF89078F140b57f4718623C0533786D2',
    },
};
