import React from 'react';
import './games.css'

function Games(props) {
  const handleMouseOver = (id) => {
    props.handleHover(id);
  }

  return (
    <>
      <td onMouseOver={() => handleMouseOver(props.background_image)} key={props.id + 1} className="tg-td-name">{props.name}</td>
      <td key={props.id + 2} className="tg-0lax">{props.genre}</td>
      <td key={props.id + 3} className="tg-0lax">{props.rating}</td>
      <td key={props.id + 4} className="tg-0lax">{props.released}</td>
    </>


  )
}
export default Games;
