let io;

module.exports={

    init : httpServer=>{
        io=require('socket.io')(httpServer,{
            cors: {
              origin: "http://localhost:3000",
              methods: ["GET", "POST","PUT"],
              allowedHeaders: ["Access-Control-Allow-Origin","Access-Control-Allow-Methods","Access-Control-Allow-Headers"]
              
            }
          });
        return io;
    },
    getIo : ()=>{
        if(!io)
        {
            throw new Error('socket io is not initialized!');
        }
        return io;

    }

}