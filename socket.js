const Chat = require("./schemas/chat");
const SocketIO = require("socket.io");
const server = require("./app");
const io = SocketIO(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
    io.on("connection", (socket) => {
        console.log("Connected to Browser ✅")
        
        socket.on("join_room", (data) => {  //채팅방 입장
            socket.join(data);
        });


        socket.on("send_message", async (data) => {  //채팅 메시지 및 채팅기록 저장 
            log = await Chat.findOne({ room: data.room })
            if (log) {
                await Chat.updateOne({ room: data.room }, {
                    // $push: { chatLog : data.message, nickname : data.author, chatTime : data.time} 
                    $push: {
                        chatLog: { $each: [data.message], $slice: -80 }, //채팅로그 80개 까지만 저장
                        nickname: { $each: [data.author], $slice: -80 },
                        chatTime: { $each: [data.time], $slice: -80 },
                    }
                     
                }) //배열에 메시지 추가
                socket.to(data.room).emit("receive_message", data);
            } else {
                await Chat.create({ room: data.room, postId: data.postId, chatLog: data.message, nickname: data.author, chatTime: data.time })
                socket.to(data.room).emit("receive_message", data);
            }

        });

        socket.on("join_box", (data) => {
            socket.join(data);
            console.log(`User: ${socket.id} room: ${data}`);
        });

        socket.on("SaveDone_data", (data) => {
            // console.log("저장한사람: ", data.author);
            socket.to(data.room).emit("SaveGet_data", data);
            console.log("save", data.author);
        });

        socket.on("liveText_send", (data) => {
            socket.to(data.room).emit("liveText_receive", data);
            console.log("live", data.msg)
        });

        socket.on("join_save", (data) => {
            socket.join(data);
        });
        socket.on("join_marker", (data) => {
            socket.join(data);
        });
        socket.on("send_marker", (name, x, y, nowDay, pins, room) => { //좌표생성
            socket.to(room).emit("receive_marker", name, x, y, nowDay, pins);
        });    
        socket.on("join_dayDone", (data) => {
            socket.join(data);
        });    
        socket.on("send_dayDone", (data, person) => { //알림 
            socket.to(data).emit("receive_dayDone", person);
        });
    })


// }

