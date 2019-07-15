import io from 'socket.io-client';

export default class Client {

    constructor () {
        this.socket = io('http://localhost:3000/', {
            'path': '/gateway',
        });

        this.registerHandlers();
    }

    registerHandlers () {
        this.socket.on('connect', () => {
            console.log('Simulator gateway connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Simulator gateway disconnected');
        });
    }

    on (eventName, callback) {
        return this.socket.on(eventName, callback);
    }

    initSimulation (formalism, netModel, serializedData) {
        this.socket.emit(
            'simulation.init',
            formalism,
            netModel,
            serializedData
        );
    }

    start () {
        this.socket.emit('simulation.start');
    }

    step () {
        this.socket.emit('simulation.step');
    }

    stop () {
        this.socket.emit('simulation.stop');
    }

    terminate () {
        this.socket.emit('simulation.terminate');
    }

    getMarking () {
        this.socket.emit('marking.get');
    }

}
