import { useDispatch } from 'react-redux';
import './find.css'
import { findGames } from '../../redux/actions/actions';
import { useState } from 'react';

const Find = () => {
    const [find, setFind] = useState('')
    const dispatch = useDispatch()
    const handleChange = async (e) => {
        let name = await e.target.value
        setFind(name)
    }

    function handleClick() {
        dispatch(findGames(find))
    }

    return (
        <div className='find'>
            <h1 className='findH1'>FIND</h1>
            <input placeholder='Name...' type="text" name="fin" id="find" onChange={handleChange} />
            <button onClick={handleClick}>Search</button>
        </div>
    )
}
export default Find;
