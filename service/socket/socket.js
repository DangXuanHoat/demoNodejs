import  {Server} from 'socket.io';
let TAG = "Socket.io"
export default class Socket{
    constructor(server){
        if (!!Socket.instance) {
            return Socket.instance;
        }
        this.eventemits = new Set()
        this.eventOn = new Set()
        this.broadcast = new Set()
        this.IO = new Server(server)
        Socket.instance = this;
        return this;
    }
    addOn(){

    }
    addEmit(socket, event,callback){

    }
    addBroadCast(socket,room,){

    }
    getSocket(){

    }
    buildSocket(){
        const io =  this.IO
        io.on('connection',socket=>{
            socket.on('disconnect',()=>{
                info(`socket : ${socket.id} đã ngắt kết nối!`,TAG)
            })
        })
    }

}