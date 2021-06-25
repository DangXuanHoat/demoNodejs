import  {Server} from 'socket.io';
import moment from 'moment'
let TAG = "socketChat "
const botName = 'ChatCord Bot';
export default socketChat = (server)=>{
    const io = new Server(server)
    io.on('connection', socket => {
        debug(socket,TAG+"connection")
        socket.on('joinRoom', ({ username, room }) => {
          const user = userJoin(socket.id, username, room);
          debug(``)
          socket.join(user.room);
          // Welcome current user
          socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
          
          // Broadcast when a user connects
          socket.broadcast
            .to(user.room)
            .emit(
              'message',
              formatMessage(botName, `${user.username} has joined the chat`)
            );
      
          // Send users and room info
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
        });
      
        // Listen for chatMessage
        socket.on('chatMessage', msg => {
          const user = getCurrentUser(socket.id);
      
          io.to(user.room).emit('message', formatMessage(user.username, msg));
        });
      
        // Runs when client disconnects
        socket.on('disconnect', () => {
          const user = userLeave(socket.id);
      
          if (user) {
            io.to(user.room).emit(
              'message',
              formatMessage(botName, `${user.username} has left the chat`)
            );
      
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
              room: user.room,
              users: getRoomUsers(user.room)
            });
          }
        });
      });
}
/**
 * 
 * @returns 
 */
const formatMessage = ()=>{
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}
/**
 * join room chat
 * @param {*} id 
 * @param {*} username 
 * @param {*} room 
 * @returns 
 */
const userJoin = (id, username, room)=> {
  // const user = { id, username, room };
  // users.push(user);

  // return user;
}

/**
 * Lay thong tin nguoi dung
 * @param {} id 
 * @returns 
 */
const  getCurrentUser= (id) =>{
  // return users.find(user => user.id === id);
}

/**
 * nguoi dung roi khoi ung dung chat
 * @param {} id 
 * @returns 
 */
const userLeave = (id)=>{
  // const index = users.findIndex(user => user.id === id);
  // if (index !== -1) {
  //   return users.splice(index, 1)[0];
  // }
}

/**
 * Lay thong tin nguoi dung trong phong chat
 * @param {*} room 
 * @returns 
 */
const getRoomUsers = (room)=> {
  // return users.filter(user => user.room === room);
}