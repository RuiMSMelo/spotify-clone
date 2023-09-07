import React from 'react'

export default function TrackSearchResult( {track, chooseTrack} ) {
    function handlePlay() {
        chooseTrack(track)
    }
  return (
    <div className='d-flex m-2 align-items-center search-result' style={{cursor: 'pointer'}} onClick={handlePlay}>
        <img src={track.albumUrl} style={{height: '70px', width: '70px', borderRadius: '10px'}} alt=''></img>
        <div className='' style={{marginLeft: '10px'}}>
            <div className='h6'>{track.title}</div>
            <div className='text-muted'>{track.album}</div>
            <div className='text-muted'>{track.artist}</div>
        </div>
    </div>
  )
}
