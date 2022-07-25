
import { createRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const numbers = ['0', '1', '2', '3'];

const numberToSection = {
    '0': 'Welcome',
    '1': 'Work',
    '2': 'Projects',
    '3': 'Contact'
}

const texts = [
    { heading: 'Welcome!', subHeading: 'Portfolio' },
    { heading: 'Work', subHeading: '202X' },
    { heading: 'Projects', subHeading: 'Web + Design' },
    { heading: 'Contact', subHeading: 'Reach Out' },
]

const IndicatorText = props => {


    let currentSection = parseInt(props.currentSection);
    let contextSubheading = props.contextSubheading;
    let mobileMode = props.mobileMode;


    let heading = texts[currentSection].heading;
    let subheading = contextSubheading && !mobileMode ? contextSubheading : texts[currentSection].subHeading;

    return (
        <div id='Indicator-text'>
            <div className='indicator-text'>
                <div className='indicator-text-heading'>
                    <span>{heading}</span>
                </div>
                <div className='indicator-text-seperator'>
                    <span></span>
                </div>
                <div className='indicator-text-subheading'>
                    {
                        subheading.split('').map((char, index) => {
                            return <span key={index}>{char}</span>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const IndicatorNumbers = props => {

    const currentSection = props.currentSection;
    const setIsInSpecialScrollCase = props.setIsInSpecialScrollCase;

    return (
        <div id='indicator-numbers'>
            {
                numbers.map(number => {
                    let active = currentSection === number;
                    return <IndicatorNumber setIsInSpecialScrollCase={setIsInSpecialScrollCase} setCurrentSection={props.setCurrentSection} key={number} number={number} active={active} />
                })
            }
        </div>
    )
}


const IndicatorNumber = props => {
    const number = props.number;
    const active = props.active;
    const ref = createRef();

    return (
        <div ref={ref} onClick={() => props.setCurrentSection({ section: number, setIsInSpecialScrollCase: props.setIsInSpecialScrollCase })} className={`indicator-number number-${number} ${active ? 'active' : ''}`}>
            <a className='indicator-number-link' href={`#${numberToSection[number].toLowerCase()}`}>{number}</a>
        </div>
    )
}


const Indicator = props => {
    let mobileMode = props.mobileMode;
    let hidden = props.showNavbar ? '' : 'hidden';
    hidden = mobileMode ? '' : hidden;
    if (props.contactSectionIndicator) {
        hidden = !props.showNavbar ? '' : 'hidden';
    }
    return (
        <div id={`${props.contactSectionIndicator ? 'contact-indicator' : 'indicator'}`} className={`${hidden}`}>
            <IndicatorNumbers setIsInSpecialScrollCase={props.setIsInSpecialScrollCase} currentSection={props.currentSection} setCurrentSection={props.setCurrentSection} />
            <IndicatorText mobileMode={mobileMode} contextSubheading={props.contextSubheading} currentSection={props.currentSection} />
        </div>
    )
}


export default Indicator;