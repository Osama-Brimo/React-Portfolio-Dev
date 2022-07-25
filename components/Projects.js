import outboundLinkSVG from '../assets/svg/outbound-link.svg'
import outboundLinkImg from '../assets/img/outbound-link.png'

const Project = props => {
    const name = props.name;
    const tools = props.tools;
    const desc = props.desc;
    const link = props.link;
    const note = props.note;

    return (
        <a href={link} target='_blank' rel="noreferrer" className='projects-project d-block'>
            <div className='project-top'>
                <div className='project-heading'>
                    <img className='outbound-link-icon' src={outboundLinkImg} alt="🢅" />
                    <div className='project-name'>{name}</div>
                </div>
                {/* <div className='project-tools'>{tools}</div> */}
            </div>
            <div className='project-bottom'>
                <div className='project-desc'>{desc} </div>
                <div className='mt-3'>
                <span className='bold'>{note}</span>
                </div>
            </div>
        </a>
    )
}

const Projects = props => {
    const projectsList = props.projectsList;
    return (
        <section id="projects" className="main-section">
            {
                projectsList.map(project => {
                    const name = project.name;
                    const tools = project.tools;
                    const desc = project.desc;
                    const link = project.link;
                    const note = project.note;

                    return <Project
                        key={name}
                        name={name}
                        tools={tools}
                        desc={desc}
                        link={link}
                        note={note}
                    />
                })
            }
        </section>
    )
}

export default Projects;