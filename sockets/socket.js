const {io} = require('../index');

// mensajes de socket
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Escuchando', payload);
        io.emit('mensajeServ', {admin: 'Nuevo mensaje'});
    });
});