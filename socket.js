const http = require("./app");
const socketIo = require("socket.io");
const Message = require("./schemas/message");
const timeStamp = require("./schemas/timeStamp");

const io = socketIo(http, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

const timestamp = io.of("/:workSpaceName");
timestamp.on("connection", (socket, userEmail, workSpaceName, inTime) => {
  const connectionTime = outTime.getTime() - inTime.getTime();
  console.log(
    `유저가 접속하였다: ${userEmail}님이 ${workSpaceName}으로 접속.  socket.id = ${socket.id},이고 현재시각${inTime}`
  );

  socket.on("disconnect", async (socket, userEmail, outTime) => {
    console.log(
      `유저가 나갔다: ${userEmail}님이 ${workSpaceName}의 접속해제.  socket.id = ${socket.id},이고 현재시각${inTime}`
    );
    const timeData = await timeStamp.create({ userEmail, connectionTime, workSpaceName });
    console.log("timeData: ", timeData);
  });
});

const chatspace = io.of("/chat");
chatspace.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`); //연결에 사용되는 소켓 정보

  socket.on("join_room", async (room) => {
    socket.join(room);
    console.log("room: ", `${room}에 입장.`);

    const chat_list = await Message.find({ room });
    socket.emit("chat_list", chat_list);
  });

  socket.on("send_message", async (messageData) => {
    const messages = new Message(messageData);
    console.log("sendMessages: ", messages);
    await messages.save();

    //data: 방 이름, 쓴 사람, 메시지 내용, 작성 시간
    socket.to(messageData.room).emit("receive_message", messageData);
    console.log("방이름이 여기에", messageData.room);
  });
  //방 떠나면서 채팅내역 저장하게 할것임. (조회해보고 방 정보가 같으면 그쪽 데이터를 갱신해주는 방식으로 수정해야할듯.)
  socket.on("leave_room", (room, messageList) => {
    console.log("room: ", `${room}을 떠남.`);
    socket.leave(room);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
