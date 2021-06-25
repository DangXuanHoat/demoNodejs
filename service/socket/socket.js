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
    async addOn(){

    }
    async addEmit(socket, event,callback){

    }
    async addBroadCast(socket,room,){

    }
    getSocket(){

    }
    async buildSocket(){
        const io =  this.IO
        io.on('connection',socket=>{
            
            socket.on('disconnect',()=>{
                info(`socket : ${socket.id} đã ngắt kết nối!`,TAG)
            })
        })
    }

}