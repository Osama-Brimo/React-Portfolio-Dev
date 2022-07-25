import logo from '../assets/svg/logo.svg';
import { Logo, NavLinks } from './Navbar.js';

let linkSet = [{ name: '> Github', link: `https://github.com/Osama-Brimo/`, newTab: true, siteSectionLink: false }];

const Footer = props => {
    let hidden = props.showNavbar;
    return (
        <>
            <footer id='footer' className={hidden ? 'hidden' : ''}>
                <div className='footer-container'>
                    <NavLinks linkSet={linkSet} setCurrentSection={props.setCurrentSection} />
                    <Logo setCurrentSection={props.setCurrentSection} setIsInSpecialScrollCase={props.setIsInSpecialScrollCase} logoClass='footer-logo' />
                </div>
            </footer>
        </>
    );
}



export default Footer;