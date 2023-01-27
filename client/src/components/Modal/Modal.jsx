import React from "react"
import { useSelector } from "react-redux"
import './modal.css'

function Modal(props) {

    const gameFinded = useSelector(state => state?.gameFindedById)

    return (
        <div className="godFather">
            <button className="buttonModal" onClick={props.closeModal}>Close</button>
            <div className="parent">
                <div className="div1">
                    <img className="div1Img" src={gameFinded.background_image} alt="" srcset="" />
                </div>
                <div className="div2" style={{border: '1px solid 000'}}>
                    <h1 className="h1Name" style={{ textIndent: '0.5em' }}><span style={{backgroundColor: 'black'}}>{gameFinded.name}</span></h1>
                    <p style={{ textIndent: '1em' }}><span style={{backgroundColor: 'black'}}> Platforms:
                        {isNaN(gameFinded.id)
                            ? gameFinded.platforms?.map((p, i) => { return (<span key={(gameFinded.id) + { i }}> {p}</span>) })
                            : gameFinded.platforms?.map((p, i) => { return (<span key={(gameFinded.id) + { i }}> {p.platform.name}</span>) })
                        }
                        </span>
                    </p>
                    <p style={{ textIndent: '1em' }}><span style={{backgroundColor: 'black'}}>Date released: {gameFinded.released}</span></p>
                    <p style={{ color: 'gold', textIndent: '1em' }}><span style={{backgroundColor: 'black'}}> Rating:         {
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
                <div className="div3" style={{display: 'flex', flexDirection: 'column'}}>
                    <h1 className="div3h1" style={{color: 'gold'}}>DESCRIPTION</h1>
                    <br />
                    <p style={{ textIndent: '1em', fontSize: '17px' }}>{gameFinded.description_raw ? gameFinded.description_raw : gameFinded.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal