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
        
        socket.on("send_message", async (messageData) => {
            log = await Chat.findOne({room : messageData.room})
            if (log){
            await Chat.updateOne({ room : messageData.room }, { $push: { chatLog : messageData.message} }) //배열에 메시지 추가
            socket.to(messageData.room).emit("receive_message", messageData);
            console.log("메시지보냄1")
            }else{
            await Chat.create({room : messageData.room, chatLog : messageData.message })
            socket.to(messageData.room).emit("receive_message", messageData);
            console.log("메시지보냄2")
            }
            
            // socket.to(messageData.room).emit("receive_message", messageData);
        });
        
        socket.on("test_send", (data) => {
            console.log(data.msg);
            socket.to(data.room).emit("test_receive", data);
            });
        })
    }