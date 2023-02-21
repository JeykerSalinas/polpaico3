export const socketIo = async(io)=>{
    io.on('connection', (socket) => {
        console.log('usuario Conectado');
      });
}