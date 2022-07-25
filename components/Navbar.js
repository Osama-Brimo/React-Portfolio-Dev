import logo from '../assets/svg/logo.svg';
import decoEnterArrow from '../assets/svg/deco-enter-arrow.svg';
import { useEffect, useState } from 'react';
import { numberToSection, sectionToNumber } from '../assets/js/helpers.js';

let linkSet = [
    { name: 'Work', link: '#work', newTab: false, siteSectionLink: true },
    { name: 'Projects', link: '#projects', newTab: false, siteSectionLink: true },
    { name: 'Contact', link: '#contact', newTab: false, siteSectionLink: true },
]

let arrowBlocks = [
    <div className='d-inline-block'><a href="mailto:osamabrimo96@gmail.com">osamabrimo96<br />@gmail.com</a></div>,
    <div className='d-inline-block'><a href="tel:+359876213396">+359<br />87 621 3396</a></div>
];


const Burger = props => {

    const currentState = props.burgerExpanded;
    const setExpandBurger = props.setExpandBurger;

    // useEffect(() => {
    //     let burger = document.querySelector('#burger');
    //     burger.addEventListener('click', e => {

    //     })
    // })

    return (
        <div id='burger' className={currentState ? 'active' : ''} onClick={e => {
            const toggledState = !currentState;
            setExpandBurger(toggledState);
        }}>
            <div className='burgerIcon'>
                <div className='part-a'></div>
                <div className='part-b'></div>
            </div>
        </div>
    )
}

export const Logo = props => {
    const mobileMode = props.mobileMode;
    return (
        <div className={props.logoClass} onClick={mobileMode ? () => { props.setExpandBurger(false) } : e => props.setCurrentSection({ section: '0', setIsInSpecialScrollCase: props.setIsInSpecialScrollCase })}>
            <a href='#welcome'>
                <img width='121' height='62' src={logo} alt="ob." />
            </a>
        </div>
    )
}

export const NavLink = (props) => {
    const name = props.name;
    const link = props.link;
    const newTab = props.newTab;
    const siteSectionLink = props.siteSectionLink;
    const active = numberToSection(props.currentSection) === name;

    const burgerExpanded = props.burgerExpanded;
    const setExpandBurger = props.setExpandBurger;

    return (
        <a onClick={() => {
            if (!siteSectionLink) return;
            props.setCurrentSection({ section: sectionToNumber(name), setIsInSpecialScrollCase: props.setIsInSpecialScrollCase });
            if (burgerExpanded) {
                setExpandBurger(false);
            }
        }} className={`${active ? 'active' : ''}`} href={link} target={newTab ? '_blank' : null}>
            {name}
        </a>
    )
}

export const NavLinks = (props) => {
    let linkSet = props.linkSet;
    let burgerExpanded = props.burgerExpanded;
    return (
        <nav className='nav-links'>
            {
                linkSet.map(link => {
                    return (
                        <NavLink
                            burgerExpanded={burgerExpanded}
                            setExpandBurger={props.setExpandBurger}
                            currentSection={props.currentSection}
                            setIsInSpecialScrollCase={props.setIsInSpecialScrollCase}
                            setCurrentSection={props.setCurrentSection}
                            name={link.name} newTab={link.newTab}
                            link={link.link}
                            key={link.name}
                            siteSectionLink={link.siteSectionLink}
                        />
                    )
                })
            }
        </nav>
    )
}

const ArrowBlocks = (props) => {
    const arrowBlocks = props.arrowBlocks;
    const showing = props.showing;
    const showNavbar = props.showNavbar;
    const el = <div onMouseEnter={() => props.hoverHandler(true)} onMouseLeave={() => props.hoverHandler(false)} className='deco-contact'>
        <span className='deco-contact-name'>Osama Brimo</span>
        {
            arrowBlocks ?
                <div className={`deco-contact-arrow-blocks d-flex ${showing ? 'active' : ''}`}>
                    {arrowBlocks.map((arrowBlock, index) => {
                        return (
                            <div className='deco-contact-arrow-block' key={index}>
                                <div className='d-flex align-items-center'>
                                    <img className='deco-enter-arrow' src={decoEnterArrow} alt="→" height='16' width='11' />
                                    {arrowBlock}
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
                :
                null
        }

    </div>

    return (
        showNavbar ? el : null
    )
}

const ExpandedNav = props => {
    const className = props.burgerExpanded ? 'active' : '';
    return (
        <div id='nav-expanded' className={className}>
            <NavLinks burgerExpanded={props.burgerExpanded} setExpandBurger={props.setExpandBurger} currentSection={props.currentSection} linkSet={linkSet} setIsInSpecialScrollCase={props.setIsInSpecialScrollCase} setCurrentSection={props.setCurrentSection} />
        </div>
    )
}


const Navbar = props => {

    const [showArrowBlocks, setShowArrowBlocks] = useState(false);

    const mobileMode = props.mobileMode;
    const burgerExpanded = props.burgerExpanded;
    const setExpandBurger = props.setExpandBurger;
    let showing = props.showNavbar ? '' : 'hidden';
    showing = mobileMode ? '' : showing;

    return (
        <>
            <header id='navbar' className={showing}>
                <div className='navbar-container'>
                    <Logo mobileMode={mobileMode} setExpandBurger={setExpandBurger} setCurrentSection={props.setCurrentSection} setIsInSpecialScrollCase={props.setIsInSpecialScrollCase} logoClass='navbar-logo' />
                    {mobileMode ? null : <NavLinks currentSection={props.currentSection} linkSet={linkSet} setIsInSpecialScrollCase={props.setIsInSpecialScrollCase} setCurrentSection={props.setCurrentSection} />}
                    {mobileMode ? <Burger burgerExpanded={burgerExpanded} setExpandBurger={setExpandBurger} /> : null}
                </div>
                {mobileMode ? <ExpandedNav burgerExpanded={burgerExpanded} setExpandBurger={setExpandBurger} currentSection={props.currentSection} linkSet={linkSet} setIsInSpecialScrollCase={props.setIsInSpecialScrollCase} setCurrentSection={props.setCurrentSection} /> : null}
                {mobileMode ? null : <ArrowBlocks showNavbar={props.showNavbar} hoverHandler={setShowArrowBlocks} showing={showArrowBlocks} arrowBlocks={arrowBlocks} />}
            </header>
        </>
    );
}



export default Navbar;