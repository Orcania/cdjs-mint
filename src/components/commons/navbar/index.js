/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';

import { useCelesteSelector, ConnectedWrapper } from '@celeste-js/react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const getAddressReduced = address => `${address.slice(0, 6)}...${address.slice(-4)}`;

const Navbar = () => {
    // local state
    const [mobileActive, setMobileActive] = useState(false);
    const [burgerActive, setBurgerActive] = useState(false);
    const [bgColor, setBgColor] = useState(false);
    const [scrollingDown, setScrollingDown] = useState(false);

    // const { walletReducer } = useCelesteSelector(state => state);
    // const { globalReducer } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleHamburgerClick = () => {
        const newValue = !mobileActive;

        setBurgerActive(newValue);
        setMobileActive(newValue);
    };

    // const handleOpenWalletsModal = () => {
    //     dispatch(open_modal({ modalName: modals.walletsModal }));
    //     handleHamburgerClick();
    // };

    // const handleOpenWalletAccountModal = () => {
    //     dispatch(open_modal({ modalName: modals.walletAccountModal }));
    //     handleHamburgerClick();
    // };

    // const handleOpenNetworksModal = () => {
    //     dispatch(open_modal({ modalName: modals.networksModal }));
    //     handleHamburgerClick();
    // };

    const handleNavbarItemClick = () => {
        handleHamburgerClick();
    };

    useEffect(() => {
        const elmnt = document.getElementById('__next');
        let oldScroll = 0;
        elmnt.addEventListener('scroll', () => {
            if (elmnt.scrollTop > 50) setBgColor(true);
            else setBgColor(false);

            if (oldScroll && oldScroll > elmnt.scrollTop) setScrollingDown(false);
            else setScrollingDown(true);

            oldScroll = elmnt.scrollTop;
        });
    }, []);

    return (
        <nav
            className={`navbar custom-navbar is-fixed-top has-bg-hdark ${bgColor ? 'has-navbar-bg-color' : ''} 
            ${scrollingDown ? 'is-hidden-up' : ''}`}
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand  py-2">
                <Link href="/home">
                    <a className="navbar-item" onClick={handleNavbarItemClick} role="button">
                        <img src="./media/logo.png" width="120" />
                    </a>
                </Link>

                <a
                    role="button"
                    className={`navbar-burger has-text-white ${burgerActive ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={handleHamburgerClick}
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>

            <div className={`navbar-menu ${mobileActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <div className="navbar-item ">
                        <Link href="/mint">
                            <a className="navbar-item has-text-white" onClick={handleNavbarItemClick} role="button">
                                <i className="fa-solid fa-hexagon-vertical-nft" /> &nbsp; MINT
                            </a>
                        </Link>
                    </div>
                </div>

                <div className="navbar-end">
                    <ConnectedWrapper
                        disconnectedComponent={
                            <div className="navbar-item">
                                <button
                                    id="connect-button"
                                    className="button is-fullwidth is-rounded is-hblue has-background-hpink-o-2 has-border-2-hpink-o-10 is-shadowless navbar-button"
                                    type="button"
                                    onClick={() => {}}
                                >
                                    Connect Wallet
                                </button>
                            </div>
                        }
                    >
                        <div className="navbar-item">
                            <button
                                className="button is-fullwidth address-button is-rounded navbar-button"
                                type="button"
                                onClick={() => {}}
                            >
                                {/* {walletReducer.address && getAddressReduced(walletReducer.address)} */}
                            </button>
                        </div>
                    </ConnectedWrapper>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
