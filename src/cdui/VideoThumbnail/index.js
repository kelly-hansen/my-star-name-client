import React from 'react'
import PropTypes from 'prop-types'

const VideoThumbnail = ({ uri, time, name, extractYoutubeID }) => {
  return (
    <div className='thumb-link mt-3'>
      <img src={`https://img.youtube.com/vi/${extractYoutubeID(uri)}/mqdefault.jpg`} alt={name} width='100%' height='auto' />
      <span className='icon-video'><span className='far fa-play-circle' /></span>
      <div className='thumb_content d-flex flex-column'>
        <p className='mb-0 px-3'>{name} {time}</p>
      </div>
      <div className='image-overlay'></div>
      <div className='image-overlay-video-btn'></div>
    </div>
  )
}

VideoThumbnail.propTypes = {
  uri: PropTypes.string,
  name: PropTypes.string,
  extractYoutubeID: PropTypes.func,
  time: PropTypes.string
}

export default VideoThumbnail
