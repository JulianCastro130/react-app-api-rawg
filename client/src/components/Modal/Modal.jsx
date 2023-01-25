import React from "react"
import { useSelector } from "react-redux"
import './modal.css'

function Modal(props) {

    const gameFinded = useSelector(state => state?.gameFindedById)

    return (
        <div className="parent">
            <button onClick={props.closeModal}>Close</button>
            <div className="div1">
                <h1>{gameFinded.name}</h1>
                <img className="imgModal" alt="img" src={gameFinded.background_image}></img>
            </div>
            <div className="div2"><p>{gameFinded.description_raw}</p></div>
        </div>
    )
}

export default Modal