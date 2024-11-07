import React from 'react'

const Timestamp = (item) => {

    const date = new Date(item.timestamp);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    return (
        <p className='chat-name'>{formattedTime} | {formattedDate}</p>
    )
}

export default Timestamp