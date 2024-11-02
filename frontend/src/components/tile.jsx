import React from 'react'
import '../style/tile.css'

const Tile = (item) => {

  return (
    <div className='tile'>{item.tile}</div>
  )
}

export default Tile