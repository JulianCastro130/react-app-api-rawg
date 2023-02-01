import style from './about.module.css'
import github from './github.png'
import linkedin from './linkedin.png'

const About = () => {
    return (
        <div className={style.about}>
            <h1>Contact me</h1>
            <h3>cococastr619@gmail.com</h3>
            <h5>SOCIAL</h5>
            <div className={style.social}>
                <div className={style.github}>
                    <img src={linkedin} alt="img" />
                </div>
                <div className={style.linkedin}>
                    <img src={github} alt="img" />
                </div>
            </div>
        </div>
    )
}

export default About