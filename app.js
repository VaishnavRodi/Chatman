const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.port || 3000;

app.use(express.static("public"));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});


http.listen(PORT, function(){
  console.log("listening to port" + PORT);

});

// SOCKET SETUP

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('connected...');

  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
  })
})
