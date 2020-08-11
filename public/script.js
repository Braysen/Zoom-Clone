const socket = io('/')
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video'); //Validado
myVideo.muted = true;

let myVideoStream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo,stream);
})//Validado

socket.emit('join-room',ROOM_ID);

socket.on('user-connected', () => {
    connecToNewUser();    
})

const connecToNewUser = () => {
    console.log('new user');
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video);
}//Validado