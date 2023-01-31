import style from './landing.module.css'
import React from 'react'
import csico from './Csico.png'
import war3ico from './WarC3.png'
import warftico from './WarC3FT.png'
import ag2ico from './Age2.jpg'
import agcico from './Age2C.png'
import xp from './xp.png'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className={style.landing} style={{ backgroundImage: `url(${xp})` }}>
            <div className={style.icons}>
                <div id={style.wc3} className={style.ico}>
                    <img className={style.imgLanding} src={war3ico} alt="" />
                    <label htmlFor="">Warcraft III</label>
                </div>
                <div id={style.wcft} className={style.ico}>
                    <img className={style.imgLanding} src={warftico} alt="" />
                    <label>Frozen Throne</label>
                </div>

                <div id={style.cs} className={style.ico}>
                    <Link to='./home'>
                        <img className={style.imgLanding} src={csico} alt="" />
                    </Link>
                    <label htmlFor="">Counter Strike</label>
                </div>

                <div id={style.ag2} className={style.ico}>
                    <img className={style.imgLanding} src={ag2ico} alt="" />
                    <label htmlFor="">Age2</label>
                </div>
                <div id={style.agc} className={style.ico}>
                    <img className={style.imgLanding} src={agcico} alt="" />
                    <label htmlFor="">Age Conquers</label>
                </div>
            </div>
        </div>
    )
}

export default Landing