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

    start (formalism) {
        this.socket.emit('simulation.start', formalism);
    }

    step (formalism) {
        this.socket.emit('simulation.step', formalism);
    }

    stop (formalism) {
        this.socket.emit('simulation.stop', formalism);
    }

    terminate (formalism) {
        this.socket.emit('simulation.terminate', formalism);
    }

    getMarking (formalism) {
        this.socket.emit('marking.get', formalism);
    }

}
