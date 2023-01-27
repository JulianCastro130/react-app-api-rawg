import React from 'react';
import './games.css'

function Games(props) {

  const handleMouseOver = (background_image,name) => {
    props.handleHover(background_image,name)
  }

  return (
    <>
      <td onMouseOver={() => handleMouseOver(props.background_image,props.name)} key={props.id + 1} className="tg-td-name">{props.name}</td>
      <td key={props.id + 2} className="tg-0lax">{props.genre}</td>
      <td className='td_platforms' key={props.id + 5}>{props.platform}</td>
      <td key={props.id + 4} className="tg-0lax">{props.released}</td>
      <td key={props.id + 3} className="td_rating">
        {
          Math.floor(props.rating) === 1 
          ? `★ (${props.rating})` 
          : Math.floor(props.rating) === 2 
          ? `★★ (${props.rating})` 
          : Math.floor(props.rating) === 3 
          ? `★★★ (${props.rating})` 
          : Math.floor(props.rating) === 4 
          ? `★★★★ (${props.rating})` 
          : `(${props.rating})`
        }
      </td>
    </>

  )
}
export default Games;
