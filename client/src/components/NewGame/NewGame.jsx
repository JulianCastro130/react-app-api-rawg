import { useState } from "react";
import React from "react";
import axios from "axios";
import style from './newGame.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGames, renderGame } from "../../redux/actions/actions";

const validate = (form) => {
    let errors = {};
    if (!/^([a-zA-Z ]){2,30}$/.test(form.name)) {
        errors.name =
            "Error";
    }
    if (!form.genre.length) {
        errors.genre =
            "Error"
    }
    if (!form.platforms.length) {
        errors.platforms =
            "Error"
    }
    if (!/^[a-zA-Z]+$/.test(form.description)) {
        errors.description =
            "Error";
    }
    if (!/^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-]\d{4}$/.test(form.released)) {
        errors.released =
            "Error";
    }
    if (!/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i.test(form.background_image)) {
        errors.background_image =
            "Error";
    }
    if (!/^[ 0-9-]+$/.test(form.rating)) {
        errors.rating =
            "Error";
    }
    return errors;
};

const NewGame = () => {
    const platforms = useSelector((state) => state.platforms);
    const genres = useSelector((state) => state.genres);
    const gameRendered = useSelector((state) => state?.gameRendered)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const [showGame, setShowGame] = useState(false)

    const [form, setForm] = useState({
        name: "",
        genre: [],
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        background_image: ""
    })

    useEffect(() => {
    }, [form, gameRendered])

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({
            ...form,
            [property]: value
        })
        setErrors(
            validate(
                {
                    ...form,
                    [property]: value
                }
            )
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const stringForm = JSON.stringify(form)
        const jsonForm = await JSON.parse(stringForm)
        axios.post(`http://localhost:3001/videogames`, jsonForm)
        dispatch(getGames())
        dispatch(renderGame(form))
        setTimeout(() => {
            setShowGame(true)
        }, 1500)
    }

    const handleGenreChange = (event) => {
        let selectedOptions = event.target.value
        if (!form.genre.includes(selectedOptions)) {
            setForm({
                ...form,
                genre: [...form.genre, selectedOptions]
            })
        } else {

            setForm({
                ...form,
                genre: form.genre.filter((g) => g !== selectedOptions)
            })
        }
    };

    const handlePlatformChange = (event) => {
        let selectedOptions = event.target.value
        if (!form.platforms.includes(selectedOptions)) {
            setForm({
                ...form,
                platforms: [...form.platforms, selectedOptions]
            })
        } else {
            setForm({
                ...form,
                platforms: form.platforms.filter((p) => p !== selectedOptions)
            })
        }
    };

    return (
        <div className={style.divNewGame}>
            <h1 className={style.NewGameH1}>Create Game</h1>

            <form onSubmit={handleSubmit} className={style.formNewGame}>
                <div className={style.div1N}>
                    {showGame && <div className={style.divGameCardWrap}>
                        {gameRendered
                            ? <div className={style.divGameCard} key={gameRendered.rating + 1}>
                                <h4 style={{color: 'white'}} key={gameRendered.rating + 2}>{gameRendered.name}</h4>
                                <img key={gameRendered.rating + 9} height='100%' width='100%' src={gameRendered.background_image} alt="img" />
                                <p key={gameRendered.rating + 5}>{gameRendered.genre.toString()}</p>
                                <p key={gameRendered.rating + 6}>{gameRendered.platforms?.toString()}</p>
                            </div>
                            : null}
                    </div>}
                </div>

                <div className={style.div2N}>

                    <div className="divName">

                        <label className={style.tdNewGameLabel}>Name</label>{errors.name && <span className={style.errors}>{errors.name}</span>}

                        <input className={style.inputNewGame} type='text' placeholder="Name..." name="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="divRelease">

                        <label className={style.tdNewGameLabel}>Release date</label>{errors.release && <span className={style.errors}>{errors.release}</span>}

                        <input className={style.inputNewGame} type='date' placeholder="Released..." name="released" value={form.released} onChange={handleChange} />

                    </div>
                </div>

                <div className={style.div3N}>

                    <div className="divImage">

                        <label className={style.tdNewGameLabel}>Image</label>{errors.background_image && <span className={style.errors}>{errors.background_image}</span>}

                        <input className={style.inputNewGame} type='text' placeholder="Image..." name="background_image" value={form.background_image} onChange={handleChange} />

                    </div>

                    <div className="divRating">

                        <label className={style.tdNewGameLabel}>Rating</label>{errors.rating && <span className={style.errors}>{errors.rating}</span>}

                        <input className={style.inputNewGame} type='number' placeholder="Rate 1 to 5" name="rating" value={form.rating} onChange={handleChange} />

                    </div>

                </div>
                <div className={style.div4N}>
                    <div className={style.divGenre}>
                        <label className={style.tdNewGameLabel}>Genres</label>{errors.genre && <span className={style.errors}>{errors.genre}</span>}

                        <div id={style.checkboxes} onChange={(e) => handleGenreChange(e)}>
                            {genres.map((g) => (
                                <label className={style.inputNewGame}>
                                    <input className="inputGenre" type="checkbox" value={g.name} key={g.id} />
                                    {g.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className={style.divPlatform}>
                        <label className={style.tdNewGameLabel}>Platforms</label>{errors.platforms && <span className={style.errors}>{errors.platforms}</span>}

                        <div id={style.checkboxes} onChange={(e) => handlePlatformChange(e)}>
                            {platforms.map((p) => (
                                <label className={style.inputNewGame}>
                                    <input type="checkbox" value={p.name} key={p.id} />
                                    {p.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={style.div5N}>

                    <label className={style.tdNewGameLabelDescription}>Description</label>{errors.description && <span className={style.errors}>{errors.description}</span>}

                    <br />

                    <textarea className={style.inputNewGameTextarea} type='text' placeholder="Description..." name="description" value={form.description} onChange={handleChange} />

                    <button className={style.buttonNewGame} type="submit">SUBMIT</button>
                </div>



            </form>

        </div>
    )
}
export default NewGame;
