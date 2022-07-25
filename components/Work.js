import decoBigArrowNormalNextSVG from '../assets/svg/deco-big-arrow-normal-next.svg';
import decoBigArrowNormalPrevSVG from '../assets/svg/deco-big-arrow-normal-prev.svg';
import decoBigArrowEndSVG from '../assets/svg/deco-big-arrow-end.svg';

import { returnTransform } from '../assets/js/helpers.js';


const DecoBigArrow = props => {
    const type = props.type;
    const name = props.name;
    return (
        <div className={`deco-big-arrow ${name}`}>
            <img src={type} alt="->" width="188" height="114" />
        </div>
    )
}

const thing = {/* {
    next ? <DecoBigArrow type={decoBigArrowNormalNextSVG} /> : 
    prev && !next ?<DecoBigArrow type={decoBigArrowEndSVG} /> :
    prev ? <DecoBigArrow type={decoBigArrowNormalPrevSVG} /> :
    null
} */};

const WorkEntry = props => {

    let name = props.name;
    let overheading = props.overheading;
    let subheading = props.subheading;
    let descEntries = props.descEntries;

    return (
        <div onWheel={e => console.log('wheel on work section')} className='work-entry'>
            <div className='work-entry-top'>
                <div className='work-entry-overheading'> <span>{overheading}</span> </div>
                <div className='work-entry-name'> <span>{name}</span> </div>
                <div className='work-entry-subheading'> <span>{subheading}</span> {props.year ? <span>- {props.year}</span> : null} </div>
            </div>
            <div className='work-entry-bottom'>
                {
                    descEntries
                }
            </div>
        </div>
    )
}

const Work = props => {
    let workList = props.workList;
    let currentWorkEntry = props.currentWorkEntry;
    let mobileMode = props.mobileMode;

    return (
        <section id="work" className="site-section">



            <div className='work-container' style={{ transform: returnTransform(currentWorkEntry, 'X') }}>

                {
                    workList.map((workEntry, index) => {
                        let name = workEntry.name;
                        let overheading = workEntry.overheading;
                        let subheading = workEntry.subheading;
                        let descEntries = workEntry.descEntries;
                        let year = mobileMode ? workEntry.year : null;

                        let next = workList[index + 1];
                        let prev = workList[index - 1];

                        return (
                            <div className='work-entry-container' key={name}>
                                < WorkEntry
                                    name={name}
                                    overheading={overheading}
                                    subheading={subheading}
                                    descEntries={descEntries}
                                    year={year}
                                />

                                {
                                    mobileMode ? null :
                                        prev && next ? <> <DecoBigArrow name={'arrow-prev'} type={decoBigArrowNormalPrevSVG} /> <DecoBigArrow name={'arrow-next'} type={decoBigArrowNormalNextSVG} /> </> :
                                            next ? <DecoBigArrow name={'arrow-next'} type={decoBigArrowNormalNextSVG} /> :
                                                prev && !next ? <DecoBigArrow name={'arrow-end'} type={decoBigArrowEndSVG} /> :
                                                    prev ? <DecoBigArrow name={'arrow-prev'} type={decoBigArrowNormalPrevSVG} /> :
                                                        null
                                }

                            </div>
                        )
                    })
                }
            </div>
        </section >
    )
}



export default Work;