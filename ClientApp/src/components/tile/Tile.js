import React from 'react'
import './tile.css'
import useSound from 'use-sound';
import popSoundFx from '../../resources/audio/ui-fx/pop.mp3';

function Tile({ id, title, image, bgColor, textColor, css }) {
  const [playPop] = useSound(popSoundFx)
  return (
    <div className="tile global-hover" onClick={playPop} style={{background:bgColor, color:textColor, ...css}} >
      <img src={image} alt="icon" className="tile__icon" />
      <div className="tile__lesson">{id}</div>
      <div className="tile__title">{title}</div>
      {/* <DummyRating /> */}
    </div>
  )
}

export default Tile