const express = require('express'); //Validado
const app = express(); //Validado
const server = require('http').Server(app);//Validado
const io = require('socket.io')(server)
const { v4:uuidv4 } = require('uuid');//Validado
app.set('view engine', 'ejs');//Validado
app.use(express.static('public'));


app.get('/', (req,res) => { //Validado
    res.redirect(`/${uuidv4()}`);  
})

app.get('/:room',(req,res) => {//Validado
    res.render('room', { roomId: req.params.room})
})

io.on('connection', socket => {
    
})


server.listen(3030);