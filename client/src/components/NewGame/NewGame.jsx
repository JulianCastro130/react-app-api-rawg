import { useState } from "react";
import React from "react";
import axios from "axios";
import style from './newGame.module.css'
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
    const [errors, setErrors] = useState({})

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
    }, [form])

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

    console.log(form);

    return (
        <div className={style.divNewGame}>
            <h1 className={style.NewGameH1}>Create Game</h1>
            <div className={style.divNewGame2}>
                <form onSubmit={handleSubmit} className={style.formNewGame}>
                    <table className={style.tableNewGame}>
                        <tbody className={style.tbodyNewGame}>
                            <tr className={style.trNewGame}>
                                <td className={style.tdNewGameInput}>
                                    <h2 className={style.tdNewGameLabel}>Name</h2>{errors.name && <span className={style.errors}>{errors.name}</span>}
                                    <br/>
                                    <input className={style.inputNewGame} type='text' placeholder="Name..." name="name" value={form.name} onChange={handleChange} />
                                </td>
                                <td className={style.tdNewGameInput}>
                                    <h2 className={style.tdNewGameLabel}>Release date</h2>{errors.release && <span className={style.errors}>{errors.release}</span>}
                                    <br/>
                                    <input className={style.inputNewGame} type='date' placeholder="Released..." name="released" value={form.released} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className={style.trNewGame}>
                                <td className={style.tdNewGameInput}>
                                    <h2 className={style.tdNewGameLabel}>Genres</h2>{errors.genre && <span className={style.errors}>{errors.genre}</span>}
                                    <div id={style.checkboxes} onChange={(e) => handleGenreChange(e)}>
                                        {genres.map((g) => (
                                            <label className={style.inputNewGame}>
                                                <input className="inputGenre" type="checkbox" value={g.name} key={g.id} />
                                                {g.name}
                                            </label>
                                        ))}
                                    </div>
                                </td>
                                <td className={style.tdNewGameInput}>
                                    <h2 className={style.tdNewGameLabel}>Platforms</h2>{errors.platforms && <span className={style.errors}>{errors.platforms}</span>}
                                    <div id={style.checkboxes} onChange={(e) => handlePlatformChange(e)}>
                                        {platforms.map((p) => (
                                            <label className={style.inputNewGame}>
                                                <input type="checkbox" value={p.name} key={p.id} />
                                                {p.name}
                                            </label>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                            <tr className={style.trNewGame}>
                                <td className={style.tdNewGameInput}>
                                    <h2 className={style.tdNewGameLabel}>Image</h2>{errors.background_image && <span className={style.errors}>{errors.background_image}</span>}
                                    <br/>
                                    <input className={style.inputNewGame} type='text' placeholder="Image..." name="background_image" value={form.background_image} onChange={handleChange} />
                                </td>
                                <td className={style.tdNewGameInput}>
                                    <h2 className={style.tdNewGameLabel}>Rating</h2>{errors.rating && <span className={style.errors}>{errors.rating}</span>}
                                    <br/>
                                    <input className={style.inputNewGame} type='number' placeholder="Rate 1 to 5" name="rating" value={form.rating} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className={style.trNewGame}>
                                <td className={style.tdNewGameInputDescription}>
                                    <h2 className={style.tdNewGameLabelDescription}>Description</h2>{errors.description && <span className={style.errors}>{errors.description}</span>}
                                    <textarea className={style.inputNewGame} type='text' placeholder="Description..." name="description" value={form.description} onChange={handleChange} />
                                </td>
                            </tr>
                        </tbody>
                        <button className={style.buttonNewGame} type="submit">SUBMIT</button>
                    </table>
                </form>
            </div>
        </div>
    )
}
export default NewGame;
