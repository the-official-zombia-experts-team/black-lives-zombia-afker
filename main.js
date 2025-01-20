// cloud based zombia afker.
const network = require("./network.js");
const readline = require("readline-sync");

const servers = {
    "v03001" : "ws://server-v03001.zombia.io:8000/",
    "v01001" : "ws://server-v01001.zombia.io:8000/",
    "v03002" : "ws://server-v03002.zombia.io:8001/", 
    "v01002" : "ws://server-v01002.zombia.io:8001/"
};

let autoReconnect = true; // change to false if you don't want auto reconnect to be enabled by default.

class Afker {
    constructor(wsUrl, psk, username) {
        this.wsUrl = wsUrl;
        this.psk = psk;
        this.username = username; // black livefs matter, change this to another username if you want to use another username for the alt
        this.sock = null;
        this.network = new network.Network();
        this.connect();
    };

    connect() {
        console.log("attempting to connect");
        this.sock = new WebSocket(this.wsUrl);
        this.sock.binaryType = "arraybuffer"; 
        this.sock.addEventListener("open", this.onSockOpen.bind(this));
        this.sock.addEventListener("close", this.onSockClose.bind(this));
    };

    onSockClose(e) {
        console.log("sock closed, attempting to reconnect");
        if (!autoReconnect) return; // this skips auto reconnection if autoreconnect is set to false
        try {
            this.connect();
        } catch (err) {
            throw new Error(err);
        };
    };

    onSockOpen(e) {
        console.log("sock opened");
        this.sock.send(this.network.encode(4, {
            "name" : this.username,
            "partyKey" : this.psk
        }));
    };
};

const sendAlt = (serverId, psk) => {
    try {
        let wsUrl = servers[serverId];
        if (process.argv[4]) {
            let username = process.argv[4];
        } else {
            let username = "Player"
        }
        new Afker(wsUrl, psk, username);
    } catch (err) {
        console.log("couldn't find the right websocket url. maybe you made a typo in the server id. Please enter a server id as the first argument, example: v01001");
        console.error("\n\nError: ", err);
        return;
    };
};

const main = () => {
    if (process.argv.length < 4) {
        console.log("Usage:\n\
            node main.js {serverid(example: v01001)} {party sharekey (psk)} {username (optional)}");
        return;
    };

    //while (true) {
        let serverId = process.argv[2];
        let psk = process.argv[3];
        sendAlt(serverId, psk);
    //};
};

main();
