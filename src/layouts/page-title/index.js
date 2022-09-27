import Head from 'next/head';
import appConfig from 'src/static/app.config';

const { appName } = appConfig;

const PageTitleLayout = ({ pageName, children }) => {
    return (
        <>
            <Head>
                <title>{`${pageName} | ${appName}`}</title>
            </Head>
            {children}
        </>
    );
};

export const getLayout = (page, pageName = '') => <PageTitleLayout pageName={pageName}>{page}</PageTitleLayout>;

export default PageTitleLayout;
