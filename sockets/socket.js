const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Héroes del silencio'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Megadeth'));
bands.addBand(new Band('Judas Priest'));

// console.log(bands);


// mensajes de socket
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Escuchando', payload);
        io.emit('mensajeServ', {admin: 'Nuevo mensaje'});
    });

    client.on('este-mensaje', ( payload ) => {
        io.emit('nuevo-mensaje', payload);
    });

    client.on('mimensaje', (payload) => {
        console.log(payload);
        client.broadcast.emit('nuevo-mensaje', payload);
    });

	client.on('vote-band', (payload) => {
        // console.log(payload.id);
        bands.voteBand(payload.id);
       	// bands.getBands();
       	// console.log(bands);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


});