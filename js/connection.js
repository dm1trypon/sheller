class ClientWS {
    constructor(ip) {
        this.ip = ip;
        console.log(this.ip);
        this.socket = new WebSocket("ws://" + this.ip + ":44443");
        this.socketWorker();
    }

    socketWorker() {
        let ip = this.ip;
        console.log(this.ip);
        this.socket.onopen = function() {
            onConnection("connect");
            console.log("Connection to " + ip + " succesed.");
        };
        
        this.socket.onclose = function(event) {
            console.log(ip);
            if (event.wasClean) {
                console.log("Connection to " + ip + " has been closed.");
            } else {
                console.log("Disconnected host " + ip);
            }
            console.log('Code: ' + event.code + '; Reason: ' + event.reason);
        };
        
        this.socket.onmessage = function(event) {
            console.log("Recieved data: " + event.data);
            fromJson(event.data);
        };
        
        this.socket.onerror = function(error) {
            onConnection("error");
            console.log("Error: " + error.message);
        };
    }

    sender(data) {
        this.socket.send(data);
    }

    get ipHost() {
        return this.ip;
    }

    get ws() {
        return this.socket;
    }
}