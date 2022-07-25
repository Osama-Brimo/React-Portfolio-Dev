import Navbar from './components/Navbar.js';
import Indicator from './components/Indicator.js'
import Welcome from './components/Welcome.js';
import Projects from './components/Projects.js';
import Work from './components/Work.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';

import { useState, useEffect, Fragment, useReducer, createRef, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import React from 'react';
import './App.css';

import scrollIndicatorSVG from './assets/svg/scroll-indicator.svg';
import outboundLinkImg from './assets/svg/outbound-link.svg';
import whitesCut from './assets/vids/whites-cut-1.mp4';
import whitesCutSolo from './assets/vids/whites-cut-solo.mp4';


import { throttle, returnTransform, sectionToNumber, numberToSection } from './assets/js/helpers.js';

import gsap from 'gsap';
import HammerJs from 'hammerjs';

import bgVid3 from './assets/vids/Anim4.mp4';

import cubeLoopVid from './assets/vids/cubeloop-3.mp4'

const defaultVid = bgVid3;

const projectsList = [
  {
    note: 'Desktop only!',
    link: '/game-of-life',
    name: 'Game of Life',
    tools: 'Javascript, jquery, canvas',
    desc: `Game of Life visual editor with custom ruleboxes, user defined rules, and other features (LtL ruleset, gen step, delays, state jumping etc.) You can also load any custom pattern by dropping a .cells file, and save any patterns you make.`
  },
]


const workList = [
  {
    id: '0',
    name: 'Keybrand',
    overheading: 'Branding Agency',
    subheading: 'Freelance',
    descEntries:
      <div className='desc-entries'>
        <p>
          {`Client: Whites, a next generation premium dry-cleaning and laundry service from Dubai.`}
        </p>
        <ul>
          <li className='mb-2'>
            <a target='_blank' href={whitesCutSolo}>
              <img className='outbound-link-icon' src={outboundLinkImg} alt=">" />
              <span className='work-entry-em me-2'>UI/UX:</span>
              <span>
                {`Created working app Prototype and UI animations based on an existing design/brand identity, which was then handed to an app/web development agency.`}
              </span>
            </a>
          </li>
          <li>
            <a target='_blank' href={whitesCutSolo}>
              <img className='outbound-link-icon' src={outboundLinkImg} alt=">" />
              <span className='work-entry-em me-2'>Motion Design:</span>
              <span>{`Created two 20-second animations for a social media campaign based on given concepts.`}</span>
            </a>
          </li>
        </ul>
      </div>,
    year: '2021'
  },
  {
    id: '1',
    name: 'Ettijahat',
    overheading: 'Syrian NGO',
    subheading: 'Internship',
    descEntries:
      <div className='desc-entries'>
        <ul className='uselist'>
          <li>{`Updated, maintained, and fixed issues in company website.`}</li>
          <li>{`Managed Mailchimp Newsletter (template customization, audience imports/exports)`}</li>
          <li>{`Translated articles and document from English to Arabic, and vice-versa.`}</li>
          <li>{`Helped other employees with technical tasks (how to use mailchimp, explained media copyright types etc.)`}</li>
        </ul>
      </div>,
    year: '2020'
  },

]

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};

const SiteSectionsRef = createRef();


const SiteSections = props => {

  const currentSection = props.currentSection;
  const setCurrentSection = props.setCurrentSection;

  const isInSpecialScrollCase = props.isInSpecialScrollCase;
  const setIsInSpecialScrollCase = props.setIsInSpecialScrollCase;

  const currentWorkEntry = props.currentWorkEntry;
  const setCurrentWorkEntry = props.setCurrentWorkEntry;

  const mobileMode = props.mobileMode;

  const stateObj = {
    setCurrentSection: setCurrentSection,
    currentSection: currentSection,
    setIsInSpecialScrollCase: setIsInSpecialScrollCase,
    isInSpecialScrollCase: isInSpecialScrollCase,
    currentWorkEntry: currentWorkEntry,
    setCurrentWorkEntry: setCurrentWorkEntry
  }

  return (
    <div ref={SiteSectionsRef} id='site-sections' onWheel={mobileMode ? null : e => throttle(handleScroll, 100, e, stateObj)} style={mobileMode ? null : { transform: returnTransform(props.currentSection, 'Y') }}>
      {props.children}
    </div>
  )
}


function reducer(state, toSet) {
  if (toSet.section) {
    //1: Work section 
    let specialCases = ['1'];

    let specialCase = specialCases.find(_case => _case === toSet.section);
    specialCase = specialCase ? specialCase : false;

    toSet.setIsInSpecialScrollCase(specialCase);
  }

  return toSet.section;
}


const App = () => {

  //Whenever the current section is updated we need to run something to check how the next scroll will behave
  //The reducer can't see setIsInSpecialScrollCase, so my solution is to pass it with the section everytime we update the state.
  const [currentSection, setCurrentSection] = useReducer(reducer, '0');
  const [showNavbar, setShowNavbar] = useState(true);
  const [burgerExpanded, setExpandBurger] = useState(false);
  const [isInSpecialScrollCase, setIsInSpecialScrollCase] = useState(false);
  const [currentWorkEntry, setCurrentWorkEntry] = useState('0');
  const [contextSubheading, setContextSubheading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileMode, setMobileMode] = useState(window.innerWidth <= breakpoints.md);
  const [currentVideo, setCurrentVideo] = useState(defaultVid);

  const handleWindowResize = width => {
    let isMobileMode = width <= breakpoints.md;
    setMobileMode(isMobileMode);
    return isMobileMode;
  }


  useEffect(() => {
    window.addEventListener('resize', e => {
      setWindowWidth(window.innerWidth);
      handleWindowResize(window.innerWidth);
    });


  });

  //* currentSection DOM updates
  useEffect(() => {
    if (currentSection === '1' && !mobileMode) {
      if (currentWorkEntry === '0') {
        setCurrentVideo(whitesCut);
      } else {
        setCurrentVideo(cubeLoopVid);
      }
    }

  }, [currentWorkEntry])

  useEffect(() => {

    if (currentSection === '3') {
      setShowNavbar(false)
    } else {
      setShowNavbar(true);
    }

    if (currentSection === '0' && !mobileMode) {
      setCurrentVideo(defaultVid);
    } else {
      setCurrentVideo(cubeLoopVid);
    }

    if (currentSection === '1' && currentWorkEntry === '0' && !mobileMode) {
      setCurrentVideo(whitesCut);
    }

  }, [currentSection]);



  useEffect(() => {

    if (isInSpecialScrollCase && isInSpecialScrollCase === '1') {
      let workEntry = workList.find(_entry => _entry.id === currentWorkEntry);
      let subheading = workEntry.year;
      setContextSubheading(subheading);
    } else {
      setContextSubheading(false);
    }


  }, [currentWorkEntry, isInSpecialScrollCase]);


  // useEffect(() => {


  //   gsap.from('.indicator-number', {
  //     y: '-30px',
  //     duration: 1,
  //     ease: 'quart.inOut'
  //   });
  // });

  let options = {
    root: SiteSectionsRef.current,
    rootMargin: '0px 40% 0px 0px',
    threshold: 0.5
  }




  function observerCallback(entries) {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        setCurrentSection({
          section: sectionToNumber(entry.target.id),
          setIsInSpecialScrollCase: setIsInSpecialScrollCase
        });
      }
    }
  }

  let observer = new IntersectionObserver(observerCallback, options);


  //* mobileMode DOM updates
  useEffect(() => {
    if (mobileMode) {

      const sections = [
        'Welcome',
        'Work',
        'Projects',
        'Contact'
      ]

      for (let section of sections) {
        let sectionEl = document.querySelector(`#${section.toLowerCase()}`);
        observer.observe(sectionEl);
      }

      setCurrentVideo(cubeLoopVid);
    }

    return () => observer.disconnect();

  }, [mobileMode])

  useEffect(() => {
    videoRef.current.classList.add('hidden');

    setTimeout(() => {
      videoRef.current.classList.remove('hidden');
    }, 500);

  }, [currentVideo]);


  return (
    <div id='content' >
      <video ref={videoRef} muted={true} autoPlay={true} loop={true} src={currentVideo}></video>
      <Navbar burgerExpanded={burgerExpanded} setExpandBurger={setExpandBurger} mobileMode={mobileMode} showNavbar={showNavbar} currentSection={currentSection} setCurrentSection={setCurrentSection} setIsInSpecialScrollCase={setIsInSpecialScrollCase} />
      <Indicator mobileMode={mobileMode} showNavbar={showNavbar} contextSubheading={contextSubheading} currentSection={currentSection} setCurrentSection={setCurrentSection} setIsInSpecialScrollCase={setIsInSpecialScrollCase} />
      <div id='shroud'></div>
      <SiteSections


        mobileMode={mobileMode}

        currentSection={currentSection}
        setCurrentSection={setCurrentSection}

        setIsInSpecialScrollCase={setIsInSpecialScrollCase}
        isInSpecialScrollCase={isInSpecialScrollCase}

        currentWorkEntry={currentWorkEntry}
        setCurrentWorkEntry={setCurrentWorkEntry}
      >

        <Welcome />
        <Work mobileMode={mobileMode} currentWorkEntry={currentWorkEntry} setIsInSpecialScrollCase={setIsInSpecialScrollCase} workList={workList} />

        <Projects projectsList={projectsList} />

        <Contact>
          {mobileMode ? null : <Footer setCurrentSection={setCurrentSection} setIsInSpecialScrollCase={setIsInSpecialScrollCase} showNavbar={showNavbar} />
          }
        </Contact>


      </SiteSections>
      {mobileMode ? null : <Indicator contactSectionIndicator={true} mobileMode={mobileMode} showNavbar={showNavbar} contextSubheading={contextSubheading} currentSection={currentSection} setCurrentSection={setCurrentSection} setIsInSpecialScrollCase={setIsInSpecialScrollCase} />
      }
      {mobileMode ? null : <img id='scroll-indicator' src={scrollIndicatorSVG} alt="scroll" className={showNavbar ? '' : 'hidden'} />}
    </div>
  )
}

const videoRef = createRef();




function handleScroll(e, stateObj) {


  let {
    setCurrentSection,
    currentSection,
    setIsInSpecialScrollCase,
    isInSpecialScrollCase,
    currentWorkEntry,
    setCurrentWorkEntry
  } = stateObj;





  let scrollDirection = returnWheelScrollDirection(e);
  let increment = scrollDirection === 'up' ? -1 : scrollDirection === 'down' ? 1 : 0;



  if (!stateObj.isInSpecialScrollCase) {
    handleSectionScroll(increment, stateObj);

  } else {

    switch (isInSpecialScrollCase) {
      case '1':
        handleWorkScroll(increment, stateObj);
      case '3':
        handleContactScroll();
    }

  }

}


const returnWheelScrollDirection = e => {
  let result;

  if (e.touches) {
    let currentTouchY = e.touches[0].clientY;
    result = currentTouchY > window.lastTouchY ? 'up' : currentTouchY < window.lastTouchY ? 'down' : false;
    window.lastTouchY = currentTouchY;
  } else {
    result = e.deltaY > 0 ? 'down' : e.deltaY < 0 ? 'up' : false;
  }

  return result;

};

function handleSectionScroll(increment, stateObj) {
  let {
    setCurrentSection,
    currentSection,
    setIsInSpecialScrollCase,
    isInSpecialScrollCase,
    currentWorkEntry,
    setCurrentWorkEntry,
    mobileMode
  } = stateObj;

  currentSection = parseInt(currentSection);

  let nextSection = currentSection + increment;

  let min = 0;
  let max = 3;

  nextSection = nextSection > max ? max : nextSection < min ? min : nextSection;
  setCurrentSection({ section: nextSection.toString(), setIsInSpecialScrollCase: setIsInSpecialScrollCase });
}

function handleWorkScroll(increment, stateObj) {
  let {
    setCurrentSection,
    currentSection,
    setIsInSpecialScrollCase,
    isInSpecialScrollCase,
    currentWorkEntry,
    setCurrentWorkEntry
  } = stateObj;

  currentSection = parseInt(currentSection);
  currentWorkEntry = parseInt(currentWorkEntry);

  let nextWorkEntry = currentWorkEntry + increment;

  let min = 0;
  let max = workList.length - 1;

  if ((currentWorkEntry === max && increment > 0)) {
    setIsInSpecialScrollCase(false);
    handleSectionScroll(increment, stateObj);
    setTimeout(() => {
      setCurrentWorkEntry('0');
    }, 1000);

  } else if (currentWorkEntry === min && increment < 0) {
    setIsInSpecialScrollCase(false);
    handleSectionScroll(increment, stateObj);

  } else {
    nextWorkEntry = nextWorkEntry > max ? max : nextWorkEntry < min ? min : nextWorkEntry;

    setCurrentWorkEntry(nextWorkEntry.toString());
  }


}

function handleContactScroll() {

}

export default App;


//

// function handleScroll(e, setCurrentSection) {

//   let sectionCount = 4;

//   if (typeof window.translateYValue === 'undefined') window.translateYValue = 0;
//   if (typeof window.oldScroll === 'undefined') window.oldScroll = 0;

//   let siteSections = document.querySelector('#site-sections');
//   let style = window.getComputedStyle(siteSections);
//   let scrollAnimDuration = style.transitionDuration;

//   console.log(style.transitionDuration, 'transition');

//   let increment = e.deltaY > 0 ? -1 : e.deltaY < 0 ? 1 : 0;
//   let step = 100;

//   let value = window.translateYValue + (increment * step);
//   let maxDown = -1 * (100 * (sectionCount - 1));
//   let maxUp = 0;

//   value = value > maxUp ? maxUp : value < maxDown ? maxDown : value;

//   let absoluteOffset = Math.abs(value);
//   let sectionByOffset = absoluteOffset / 100;
//   let currentSection = sectionByOffset.toString();

//   console.log(absoluteOffset / 100, 'yo');

//   setCurrentSection(currentSection);

//   if (currentSection === '2') {
//     console.log('on projects...')
//   }

//   siteSections.style.transform = `translateY(${value}vh)`;

//   window.translateYValue = value;
//   window.oldScroll = e.deltaY;

// }