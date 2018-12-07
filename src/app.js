const express = require('express')
const app = express()
const socket = require('socket.io')

let port = process.env.PORT || 3200

let server = app.listen(port, () => {
    console.log(`app listening on ${port}`)
})

let io = socket(server)

let coords = {}

io.on('connection', (socket) => {
    socket.broadcast.emit('userStatus', 'a new user is connected')

    socket.on('coordinates', (data) => {

        coords[socket.id] = []
        coords[socket.id].push(data.userName)
        coords[socket.id].push(data.coords)
        io.emit('broad', coords)
    })

    socket.emit('broad', coords)

    socket.on('disconnect', () => {
        socket.broadcast.emit('userStatus', `${coords[socket.id][0]} is disconnected`)
        delete coords[socket.id]
        console.log(coords)
        io.emit('broad', coords)

    })

})

app.use(express.static(__dirname + '/../public/'))




