import { useState } from "react";
import React from "react";
import axios from "axios";
import './newGame.css'
import { useSelector } from "react-redux";

const NewGame = () => {
    const genres = useSelector((state) => state.genres);
    const [arrGenre, setArrGenre] = useState([])
    const [form, setForm] = useState({
        name: "",
        genre: [],
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        image: ""
    })

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        let platformsArray = [];
        if (property === 'platforms') {
            platformsArray = value.split(',').map(platform => platform.trim());
        }
        setForm({
            ...form,
            [property]: property === 'platforms' ? platformsArray : value,
        })
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
            selectedGenres = [{ id: selectedOptions[i].value, name: selectedOptions[i].text }]
        }
        setArrGenre([...arrGenre, ...selectedGenres]);
        setForm({
            ...form,
            genre: [...arrGenre]
        })
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
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label for="genres">Select genres:</label>

                                </td>
                                <td className="tdNewGameInput">
                                    <select multiple={true} onChange={(e) => handleGenreChange(e)}>
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
                                    <input className='inputNewGame' type='text' placeholder="Description..." name="description" value={form.description} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label className='labelNewGame' htmlFor="">Released</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <input className='inputNewGame' type='date' placeholder="Released..." name="released" value={form.released} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label className='labelNewGame' htmlFor="">Platforms</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <input className='inputNewGame' type='text' placeholder="Platforms..." name="platforms" value={form.platforms} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label className='labelNewGame' htmlFor="">URL Image</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <input className='inputNewGame' type='text' placeholder="Image..." name="image" value={form.image} onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className='trNewGame'>
                                <td className='tdNewGameLabel'>
                                    <label className='labelNewGame' htmlFor="">Rating</label>
                                </td>
                                <td className="tdNewGameInput">
                                    <input className='inputNewGame' type='number' placeholder="Rate 1 to 5" name="rating" value={form.rating} onChange={handleChange} />
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
