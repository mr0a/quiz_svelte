let host = 'djangowebdev.herokuapp.com';
// let host = '127.0.0.1:8000'

let socketIsConnecting = false;
let hasSocketEverConnected = false;
let socket;
let interval;

function connectToWebsocket() {
    if (socketIsConnecting === true) {
        return;
    }

    socketIsConnecting = true;

    if (location.protocol === "https:") {
        console.log("Attempting secure socket connection on " + host + "...");
        socket = new WebSocket(`wss://${host}/ws/demo`);
    } else {
        console.log("Attempting socket connection on " + host + "...");
        socket = new WebSocket(`ws://${host}/ws/demo`);
    }

    socket.onerror = error => {
        //Is not connected and we haven't yet said that we are done trying to
        //connect, this means that we could never even establish a connection.
        if (socket.readyState != 1 && !hasSocketEverConnected) {
            socketIsConnecting = false;
            console.log("Error establishing connection: ", error);
        } else {
            console.log("Socket error: ", error)
            clearInterval(interval)
        }
    };

    socket.onopen = () => {

        hasSocketEverConnected = true;
        socketIsConnecting = false;

        socket.onclose = event => {
            //We want to avoid handling the error multiple times and showing the incorrect dialogs.
            socket.onerror = null;

            console.log("Socket Closed Connection: ", event);
            console.log("Attempting to reestablish socket connection.");
            connectToWebsocket();
        };


        console.log("Successfully Connected");
        interval = setInterval(() => {
            socket.send(JSON.stringify({ type: "keep-alive" }));
        }, 5000);
    };
    return socket;
}

const closeWebSocket = (socket) => {
    socket.onclose = null;
    socket.close();
    clearInterval(interval)
}

export { connectToWebsocket, closeWebSocket }