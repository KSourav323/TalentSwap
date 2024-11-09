import React from 'react'
import '../style/tile.css'

const Tile = (item) => {

  return (
    <div className='clist-li'>
        <img src={`/images/${item.item.category}.jpg`} className='card-image'/>
        <h5 className='card-name'>{item.item.courseName}</h5>
        <button className='card-del' onClick={() => handleDelete(item.item.courseId)}>del</button>
    </div> 
  )
}

export default Tile