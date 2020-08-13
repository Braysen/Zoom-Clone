const express = require('express'); //Validado
const app = express(); //Validado
const server = require('http').Server(app);//Validado
const io = require('socket.io')(server)
const { v4:uuidv4 } = require('uuid');//Validado
const { ExpressPeerServer } = require('peer');//Validado
const peerServer = ExpressPeerServer(server , {
    debug: true
});
app.set('view engine', 'ejs');//Validado
app.use(express.static('public'));

app.use('/peerjs', peerServer);
app.get('/', (req,res) => { //Validado
    res.redirect(`/${uuidv4()}`);  
})

app.get('/:room',(req,res) => {//Validado
    res.render('room', { roomId: req.params.room})
})

io.on('connection', socket => {
    socket.on('join-room' , (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
    })
})


server.listen(3030);