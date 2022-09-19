const SocketIo = require("socket.io")
const Chat = require("./schemas/chat");

module.exports = (server, app) => {
    const io = SocketIo(server, {
      cors: {
        origin: '*',
        credentials: true,
      },
    });
    // app.set('socket.io', io);

    io.on("connection", (socket) => {
        console.log("Connected to Browser ✅")
        // console.log(`User Connected: ${socket.id}`);
        
        socket.on("join_room", (data) => {
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
        

        socket.on("send_message", async (data) => {
            // log = await Chat.findOne({room : data.room})
            // if(log){
            // await Chat.updateOne({ room : data.room }, { $push: { chatLog : data.message, nickname : data.author, chatTime : data.time} }) //배열에 메시지 추가
            // socket.to(data.room).emit("receive_message", data);
            // }else{
            await Chat.create({room : data.room, chatLog : data.message, nickname : data.author, chatTime : data.time })
            socket.to(data.room).emit("receive_message", data);
            // }
            
            // socket.to(messageData.room).emit("receive_message", messageData);
        });

        socket.on("SaveDone_data", (data) => {
            // console.log("저장한사람: ", data.author);
            socket.to(data.room).emit("SaveGet_data", data);
            // console.log(data.room);
        });
            
        socket.on("liveText_send", (data) => {
            socket.to(data.room).emit("liveText_receive", data);
        });

    })
    
    
    }