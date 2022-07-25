import smiley from '../assets/svg/smiley.svg';
import contactArrow from '../assets/svg/contact-arrow.svg';


const Contact = props => {
    return (
        <>
            <section id="contact" className="site-section">
                <div className='contact-container'>
                    <div className='contact-block-top'>
                        <span className='contact-my-name d-block'>Osama Brimo</span>
                    </div>
                    <div className='contact-arrow'>
                        <img src={contactArrow} alt="↴" height='153' width='14'/>
                    </div>
                    <div className='contact-block-bottom'>
                        <span className='d-block contact-location'>Vratsa, Bulgaria</span>
                        <a href='tel:+359 87 621 3396' className='d-block contact-phone'>+359 87 621 3396</a>
                        <a href='mailto:osamabrimo96@gmail.com' className='d-block contact-email'>osamabrimo96@gmail</a>
                    </div>
                </div>
            </section>

            {props.children}
        </>
    )
}

export default Contact;