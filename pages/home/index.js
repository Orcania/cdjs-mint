import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

const HomePage = () => {
    return (
        <div style={{ height: '100vh' }}>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">This page was auto generated by generate_template script</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

HomePage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Home');

export default HomePage;        
