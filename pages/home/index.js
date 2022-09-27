import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import { toast } from 'react-toastify';

import ExampleModal from 'src/components/modals/example-modal';

import { useSelector, useDispatch } from 'react-redux';

import appConfig from 'src/static/app.config';

import styles from './home.module.scss';

const { bg } = styles;

const { appVersion } = appConfig;

const Home = () => {
    // reducers

    const [displayBasic, setDisplayBasic] = useState(false);
    const { exampleReducer } = useSelector(state => state);

    const dispatch = useDispatch();

    const [msg, setMsg] = useState(exampleReducer.storage);

    const handleNotificationClick = () => {
        toast.success('Notifications included!', {
            theme: 'dark',
        });
        // NotificationsStore.addNotification(infoNotification('It includes notifications!! '));
    };

    const handleModalClick = () => {
        setDisplayBasic(true);
    };

    const handleSetVarClick = () => {
        const items = ['apple', 'banana', 'orange', 'grape', 'pear'];
        dispatch({ type: 'SET_VAR', payload: items[Math.floor(Math.random() * items.length)] });
    };

    const onHide = () => {};

    useEffect(() => {
        setMsg(exampleReducer.storage);
    }, [exampleReducer.storage]);

    const renderFooter = () => {
        return (
            <div>
                <Button
                    label="No"
                    icon="pi pi-times"
                    onClick={() => setDisplayBasic(false)}
                    className="p-button-text"
                />
                <Button label="Yes" icon="pi pi-check" onClick={() => setDisplayBasic(false)} autoFocus />
            </div>
        );
    };

    return (
        <>
            <ExampleModal />

            <div className={bg} style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                <div className="box has-bg-hdark-o-7 resize-manager">
                    <h1 className="title has-text-white has-text-centered mb-6">
                        Next js boostraper <span className="is-size-7">v{appVersion}</span>
                    </h1>
                    <h2 className="subtitle has-text-white has-text-centered has-text-justified">
                        Build apps faster with pre builded components, added libraries, and structured folders.
                    </h2>

                    <div className="columns is-marginless">
                        <div className="column">
                            <button
                                className="button is-fullwidth is-hblue outlined"
                                type="button"
                                onClick={handleNotificationClick}
                                aria-label="r2d2"
                            >
                                <span className="icon  is-size-4">
                                    <i className="fa-solid fa-robot-astromech" />
                                </span>
                            </button>
                        </div>
                        <div className="column">
                            <button
                                className="button is-fullwidth is-hblue outlined"
                                type="button"
                                onClick={handleModalClick}
                                aria-label="star wars"
                            >
                                <span className="icon  is-size-4">
                                    <i className="fa-solid fa-user-bounty-hunter" />
                                </span>
                            </button>
                        </div>
                        <div className="column">
                            <button
                                className="button is-fullwidth is-hblue outlined"
                                type="button"
                                onClick={handleSetVarClick}
                                aria-label="batman"
                            >
                                <span className="icon  is-size-4">
                                    <i className="fa-solid fa-bat" />
                                </span>
                            </button>
                        </div>
                        <div className="column">
                            <button
                                className="button is-fullwidth is-hblue outlined"
                                type="button"
                                aria-label="harry potter"
                            >
                                <span className="icon  is-size-4">
                                    <i className="fa-solid fa-broom-ball" />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-6">
                        <h1 className="subtitle has-text-white has-text-centered ">
                            <b>reducer storage:</b> <span className="animate__animated animate__fadeInDown">{msg}</span>
                        </h1>
                    </div>
                </div>{' '}
                <Dialog
                    header="Modals included!"
                    visible={displayBasic}
                    style={{ width: '50vw' }}
                    footer={renderFooter('displayBasic')}
                    onHide={onHide}
                >
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Dialog>
            </div>
        </>
    );
};

Home.getLayout = page => getPageTitleLayout(page, 'Home');

export default Home;
