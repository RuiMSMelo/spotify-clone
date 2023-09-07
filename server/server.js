const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log("refreshToken from server: ", refreshToken)
    const spotifyApi = new SpotifyWebApi ({
        redirectUri: 'http://localhost:3000/',
        clientId: '290491d6547c405f8fbaaa59b5c0d191',
        clientSecret: 'dbbe4d82c3c044118e3bca27128f65de',
        refreshToken,
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
            console.log(data.body)
        }).catch(() => {
            res.sendStatus(400)
        })    
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi ({
        redirectUri: 'http://localhost:3000/',
        clientId: '290491d6547c405f8fbaaa59b5c0d191',
        clientSecret: 'dbbe4d82c3c044118e3bca27128f65de'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((error) => {
        console.log(error)
        res.sendStatus(400)
    })
})

app.listen(3001)