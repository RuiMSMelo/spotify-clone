import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import whiteLogo from './images/Spotify_Logo_RGB_Green.png'

const spotifyApi = new SpotifyWebApi({
  clientId: '290491d6547c405f8fbaaa59b5c0d191'
})


export default function Dashboard({code}) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  console.log(searchResults)
  
  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch('')
  }

  useEffect (() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect (() => {
    if(!search) return setSearchResults([])
    if(!accessToken) return
    let cancel = false

    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      console.log(res)
      setSearchResults(res.body.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image
          return smallest
        }, track.album.images[0])

        return {
          artist: track.artists[0].name,
          album: track.album.name,
          title: track.name,
          albumUrl: smallestAlbumImage.url,
          uri: track.uri
        }
      }))
    })
    return () => cancel = true
  }, [search, accessToken])

  return (
    <Container className='d-flex flex-column py-2 dashboard' style={{height: '100vh'}}>
      <div className='logo'><img src={whiteLogo} alt='white icon'/></div>
      <Form.Control className='form' type="search" placeholder='Search Songs or Artists' value={search} onChange={e => setSearch(e.target.value)}/>
      <div className='flex-grow-1 my-2' style={{overflowY: 'auto'}}>
        {searchResults.map(track => 
          <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
        )}
      </div>
      <div className='playerdiv'>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>

    </Container>
  )
}   