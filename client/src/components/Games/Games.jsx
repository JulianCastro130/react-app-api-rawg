import React from 'react';
import style from './games.module.css'

function Games(props) {

  const handleMouseOver = (background_image,name) => {
    props.handleHover(background_image,name)
  }

  return (
    <>
      <td onMouseOver={() => handleMouseOver(props.background_image,props.name)} key={props.id + 1} className={style.name}>{props.name}</td>
      <td key={props.id + 2} className={style.genre}>{props.genre}</td>
      <td className={style.platforms} key={props.id + 5}>{props.platform}</td>
      <td key={props.id + 4} className={style.released}>{props.released}</td>
      <td key={props.id + 3} className={style.rating}>
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
