import React from 'react'
import { Container } from 'react-bootstrap'

const client_id = "290491d6547c405f8fbaaa59b5c0d191"
const redirect_uri = "http://localhost:3000/"
const AUTH_URL = `http://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
        <a className='btn btn-success btn-lg' href={AUTH_URL}>Login With Spotify</a>
    </Container>
  )
}
