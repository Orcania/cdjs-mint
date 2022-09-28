const socialMedia = [
    {
        id: 1,
        name: 'twitter',
        url: 'https://twitter.com/chaoticdjs',
        icon: () => <i className="fa-brands fa-twitter" />,
    },
    {
        id: 2,
        name: 'instagram',
        url: 'https://www.instagram.com/chaoticdjs/',
        icon: () => <i className="fa-brands fa-instagram" />,
    },
    {
        id: 3,
        name: 'discord',
        url: 'https://discord.com/invite/VRZkskRH46',
        icon: () => <i className="fa-brands fa-discord" />,
    },
];

const Footer = () => {
    return (
        <footer className="footer has-bg-hdark pb-5">
            <div className="content has-text-centered">
                <div className="containear">
                    <div className="columns is-vcentered">
                        <div className="column">
                            <img src="./media/logo.png" width="150" />
                        </div>
                        <div className="column">
                            <h1 className="subtitle has-text-white is-6">
                                Company Address:{' '}
                                <a
                                    href="https://www.google.com/maps/place/323+Sunny+Isles+Blvd,+Sunny+Isles+Beach,+FL+33160/@25.9300485,-80.1283913,17z/data=!3m1!4b1!4m5!3m4!1s0x88d9ad1a2772460d:0x648bd7f54f34fde6!8m2!3d25.9300485!4d-80.1262026"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="has-text-white"
                                >
                                    <u>323 Sunny Isles Blvd, Sunny Isles Beach, FL 33160 United States</u>
                                </a>
                            </h1>
                        </div>
                        <div className="column">
                            {socialMedia.map(item => (
                                <a
                                    key={item.id}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="has-text-white is-size-4 mx-3"
                                >
                                    {item.icon()}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
