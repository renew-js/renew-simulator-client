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

    sendInit (formalism, netModel, serializedData) {
        this.socket.emit(
            'simulation.init',
            formalism,
            netModel,
            serializedData
        );
    }

    sendStart () {
        this.socket.emit('simulation.start');
    }

    sendStep () {
        this.socket.emit('simulation.step');
    }

    sendStop () {
        this.socket.emit('simulation.stop');
    }

    sendTerminate () {
        this.socket.emit('simulation.terminate');
    }

    sendGetMarking () {
        this.socket.emit('marking.get');
    }

    onMarkingUpdate (callback) {
        this.on('marking.update', callback);
        return this;
    }

    onPluginUpdate (callback) {
        this.on('plugin.list', callback);
        return this;
    }

    onSimulationInit (callback) {
        this.on('simulation.initialized', callback);
        return this;
    }

    onSimulationError (callback) {
        this.on('simulation.error', callback);
        return this;
    }

    onDisconnect (callback) {
        this.on('disconnect', callback);
        return this;
    }

}
