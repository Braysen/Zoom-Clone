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
app.get('/', (req,res) => { 
    res.redirect(`/${uuidv4()}`);  
})//Validado

app.get('/:room',(req,res) => {
    res.render('room', { roomId: req.params.room})
})//Validado

io.on('connection', socket => {
    socket.on('join-room' , (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
        socket.on('message', (message) => {
            io.to(roomId).emit('createMessage', message)
        });
        
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})//Validado


server.listen(process.env.PORT || 3030);