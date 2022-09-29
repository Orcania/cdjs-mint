import { providers } from '@celeste-js/core/dist/constants';

const wallets = [
    {
        id: 0,
        name: 'Metamask',
        logo: 'media/logos/metamask.svg',
        provider: providers.INJECTED,
    },
    {
        id: 1,
        name: 'Wallet Connect',
        logo: 'media/logos/wallet-connect.svg',
        provider: providers.CONNECTED,
    },
];

export default wallets;
