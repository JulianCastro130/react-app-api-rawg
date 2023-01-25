import React from "react";
import { useDispatch } from "react-redux";
import { filterGames } from "../../redux/actions/actions";
import './filter.css'


function Filter() {
    const dispatch = useDispatch()
    function handleClick (id) {
        console.log(id)
        dispatch(filterGames(id))
    }

    return (
      <div key='43627846287346287346'>
        <button key='436278462873462873' onClick={()=>handleClick("db")}>Own Created Games</button>
        <button key='4367346287346' onClick={()=>handleClick('api')}>World Wide Games</button>
        <button key='22312312312' onClick={()=>handleClick('refresh')}>Refresh</button>
      </div>
  
    )
  }
  export default Filter;