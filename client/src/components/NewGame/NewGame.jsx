import { useState } from "react";
import React from "react";
import axios from "axios";
import './newGame.css'
import { useSelector } from "react-redux";
import { useEffect } from "react";

const validate = (form) => {
    let errors = {};
    if (!/^([a-zA-Z ]){2,30}$/.test(form.name)) {
        errors.name =
            "Error";
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
        let selectedGenres = []
        const selectedOptions = event.target.selectedOptions;
        for (let i = 0; i < selectedOptions.length; i++) {
            selectedGenres = selectedOptions[i].text
        }
        if (!form.genre.includes(selectedGenres)) {
            setForm({
                ...form,
                genre: [...form.genre, selectedGenres]
            })
        }
    };

    const handlePlatformChange = (event) => {
        let selectedPlatforms = []
        const selectedOptions = event.target.selectedOptions;
        for (let i = 0; i < selectedOptions.length; i++) {
            selectedPlatforms = selectedOptions[i].text
        }
        if (!form.platforms.includes(selectedPlatforms)) {
        setForm({
            ...form,
            platforms: [...form.platforms, selectedPlatforms]
        })
    }
    };

    console.log(form);

    return (
        <div className="divNewGame">
            <div className="divNewGameH1">
                <h1 className="NewGameH1">Create Game</h1>
            </div>
            <div className="divNewGame2">
                <form onSubmit={handleSubmit} className='formNewGame'>
                    <table className='tableNewGame'>
                        <tbody className='tbodyNewGame'>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label className='labelNewGame' htmlFor="">Name</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <input className='inputNewGame' type='text' placeholder="Name..." name="name" value={form.name} onChange={handleChange} />
                                    {errors.name && <span className='errors'>{errors.name}</span>}
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label for="genres">Select genres:</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <select className='select-checkbox' multiple={true} onChange={(e) => handleGenreChange(e)}>
                                        {genres.map((g) => (
                                            <option value={g.id} key={g.id}>
                                                {g.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label className='labelNewGame' htmlFor="">Description</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <textarea className='inputNewGame' type='text' placeholder="Description..." name="description" value={form.description} onChange={handleChange} />
                                    {errors.description && <span className='errors'>{errors.description}</span>}
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label className='labelNewGame' htmlFor="">Released</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <input className='inputNewGame' type='date' placeholder="Released..." name="released" value={form.released} onChange={handleChange} />
                                    {errors.release && <span className='errors'>{errors.release}</span>}
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label for="genres">Select platforms:</label>
                                </td>
                                <td className='tdNewGameLabel'>
                                    <select className='select-checkbox' multiple={true} onChange={(e) => handlePlatformChange(e)}>
                                        {platforms.map((p) => (
                                            <option value={p.id} key={p.id}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label className='labelNewGame' htmlFor="">URL Image</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <input className='inputNewGame' type='text' placeholder="Image..." name="background_image" value={form.background_image} onChange={handleChange} />
                                    {errors.background_image && <span className='errors'>{errors.background_image}</span>}
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label className='labelNewGame' htmlFor="">Rating</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <input className='inputNewGame' type='number' placeholder="Rate 1 to 5" name="rating" value={form.rating} onChange={handleChange} />
                                    {errors.rating && <span className='errors'>{errors.rating}</span>}
                                </td>
                            </tr>
                            <tr className='divNewGameButton'>
                                <button className='buttonNewGame' type="submit">SUBMIT</button>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}
export default NewGame;
