module.exports = {
    reactStrictMode: false,
    // i18n: {
    //     locales: ['en'],
    //     defaultLocale: 'en',
    // },
    env: {
        FONT_AWESOME_KEY: '8d70729523',
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/mint',
                permanent: false,
            },
        ];
    },
};
