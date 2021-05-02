import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
/////////////////////////////////
import http from 'http';
import {Server} from 'socket.io';
////////////////////////////////
import alertRoutes from './routes/alerts.js';
import branchRoutes from './routes/branches.js';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

app.use('/alerts', alertRoutes);
app.use('/branches', branchRoutes);

const CONNECTION_URL = 'mongodb+srv://deepak:deepak123@cluster0.r1jch.mongodb.net/Beetle?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

//////////////////////////////////////////
const server = http.createServer(app);
const io = new Server(server);

io.on('connection',(socket)=>{
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on('newHunt',(hunt)=>{
    console.log('newHUnt received')
    io.emit('updateNotification',hunt);
  })
})
/////////////////////////////////////////
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);