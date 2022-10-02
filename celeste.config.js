const MintingABI = require('./src/static/abi/cdjs.json');
const ERC721ABI = require('./src/static/abi/erc721.json');

module.exports = {
    isMultichain: false,
    rpcs: {
        ETH: {
            chainId: '4',
            url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            explorer: 'https://rinkeby.etherscan.io',
        },
    },
    smartContracts: [
        {
            key: 'CDJS_MINT',
            abi: MintingABI,
            address: '0xc5Ff4D9f3Bf8Cd1493CD74131Bf05D5C67Dac06E',
        },
        {
            key: 'CDJS_ERC721',
            abi: ERC721ABI,
            address: '0xe6AAa27b004f6eb2b664E9015C1bE699Bde690C0',
        },
    ],
    addressBook: {
        ZERO: '0x0000000000000000000000000000000000000000',
        CDJS_ERC721: '0x0D6659e8D021CfAfa0e7dFbd3D470895f7f03628',
        CDJS_MINT: '0xa9f318ce445C1a9245462aB612543C9F103f27eF',
    },
};
