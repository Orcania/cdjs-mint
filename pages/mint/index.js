import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import useCountdown from 'src/hooks/useCountdown';

const mintData = [
    {
        id: 1,
        title: 'VIP List',
        premint_date: 'Oct. 2nd, 2022 @ 3:00PM UTC',
        date_timestamp: 1633120000,
        price: 0.1,
        mint_limit: 1,
    },
    {
        id: 2,
        title: 'Guest List',
        premint_date: 'TBA',
        date_timestamp: null,
        price: 0.2,
        mint_limit: 2,
    },
    {
        id: 3,
        title: 'Public',
        premint_date: 'TBA',
        date_timestamp: null,
        price: 0.3,
        mint_limit: 3,
    },
];

const Mintcard = ({ title, premint_date, date_timestamp, price, mint_limit }) => {
    return (
        <Card title={title} style={{ width: '90%' }} className="mint_card">
            <div className="has-text-centered">
                <p>
                    <b>
                        Pre-mint Opening Date and Time: <br />
                        {premint_date}
                    </b>
                </p>
                <br />
                <h2>
                    <b>Countdown:</b>
                </h2>
                <div>
                    {date_timestamp ? (
                        <h1 className="subtitale is-6 mb-0">
                            <span>DD</span>
                            {' : '}
                            <span>HH</span>
                            {' : '}
                            <span>MM</span>
                            {' : '}
                            <span>SS</span>
                        </h1>
                    ) : (
                        <h1 className="subtitale is-6 mb-0">— : — : — : —</h1>
                    )}

                    <h1 className="subtitle is-6">
                        <span>DD</span>
                        {' : '}
                        <span>HH</span>
                        {' : '}
                        <span>MM</span>
                        {' : '}
                        <span>SS</span>
                    </h1>
                </div>
                <br />
                <div>
                    <span>Price: </span>
                    <span>
                        <b>{price} ETH</b>
                    </span>
                </div>

                <div>
                    <span>Mint Limit: </span>
                    <span>
                        <b>{mint_limit}</b>
                    </span>
                </div>
            </div>
        </Card>
    );
};

const MintPage = () => {
    const header = (
        <img
            alt="Card"
            src="images/usercard.png"
            onError={e => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
        />
    );

    const footer = (
        <span>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" />
        </span>
    );

    return (
        <div className="has-bg-hdark-o-9" style={{ minHeight: '100vh', padding: '100px' }}>
            <div className="container">
                <div className="columns">
                    {mintData.map(item => {
                        return (
                            <div className="column">
                                <Mintcard
                                    title={item.title}
                                    premint_date={item.premint_date}
                                    date_timestamp={item.date_timestamp}
                                    price={item.price}
                                    mint_limit={item.mint_limit}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

MintPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Mint');

export default MintPage;
