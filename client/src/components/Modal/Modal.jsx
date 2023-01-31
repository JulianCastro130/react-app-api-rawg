import React from "react"
import { useSelector } from "react-redux"
import style from './modal.module.css'

function Modal(props) {

    const gameFinded = useSelector(state => state?.gameFindedById)

    return (
        <div className={style.godFather}>
            <button onClick={props.closeModal}>Close</button>
            <div className={style.parent}>
                <div className={style.div1}>
                    <img src={gameFinded.background_image} alt="img"/>
                </div>
                <div className={style.div2}>
                    <h1><span>{gameFinded.name}</span></h1>
                    <p><span> Platforms:
                        {isNaN(gameFinded.id)
                            ? gameFinded.platforms?.map((p, i) => { return (<span key={(gameFinded.id) + { i }}> {p}</span>) })
                            : gameFinded.platforms?.map((p, i) => { return (<span key={(gameFinded.id) + { i }}> {p.platform.name}</span>) })
                        }
                    </span>
                    </p>
                    <p><span>Date released: {gameFinded.released}</span></p>
                    <p style={{ color: 'gold' }}><span> Rating:         {
                        Math.floor(gameFinded.rating) === 1
                            ? `★ (${gameFinded.rating})`
                            : Math.floor(gameFinded.rating) === 2
                                ? `★★ (${gameFinded.rating})`
                                : Math.floor(gameFinded.rating) === 3
                                    ? `★★★ (${gameFinded.rating})`
                                    : Math.floor(gameFinded.rating) === 4
                                        ? `★★★★ (${gameFinded.rating})`
                                        : `(${gameFinded.rating})`
                    }</span></p>
                </div>
                <div id={style.div} className={style.div3}>
                    <h1>DESCRIPTION</h1>
                    <br />
                    <p>{gameFinded.description_raw ? gameFinded.description_raw : gameFinded.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal