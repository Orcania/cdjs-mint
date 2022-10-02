import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

const MintPage = () => {
    return (
        <div className="bg-mint has-bg-hdark " style={{ height: '100vh', padding: '10px 2rem' }}>
            <div className="container" style={{ height: '100% !important' }}>
                <div className="columns is-vcentered" style={{ height: '100%' }}>
                    <div className="column" />
                    <div className="column">
                        <div className="box has-bg-transparent has-border-3-hwhite-o-10">
                            <div className="row" style={{ height: '100%' }}>
                                <h1 className="text-center text-white">The Mint Will Be Back Soon</h1>
                            </div>
                        </div>
                    </div>
                    <div className="column" />
                </div>
            </div>
        </div>
    );
};

MintPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Mint');

export default MintPage;
