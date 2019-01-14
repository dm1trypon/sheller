let id = 0;
let client;
let historyBash = [""];
let remoteHost;

const REBOOT = "reboot";
const XORG = "xorg";
const KIND = "kind";
const INFO = "info";
const HALL_XORG = "hall_xorg";
const HALL_KIND = "hall_kind";
const HALL_REBOOT = "hall_reboot";
const HALL_PING = "hall_ping";
const PING = "ping";

function main() {
    toConnect();
}

function itemsCreater() {
    $("#div-connect-server").remove();
    addMain();
    onConnectToHost();
    addButtons();
    addLogger();
}

function onStateHost(ip, status) {
    if (status == "0") {
        console.log("Host " + ip + " is offline.");
        addLogLine("Host " + ip + " is offline.");
        
        if (!document.getElementById("button-host") && !document.getElementById("button-disconnect-host")) {
            $(document.getElementById("div-host")).append("<a href = \"#\" id = \"button-host\" class = \"button-class\">Connect</a>");
            onConnectToHost();
            document.getElementById("input-host").disabled = false;
        }
           
        return;
    }

    console.log("Host " + ip + " is online.");
    addLogLine("Host " + ip + " is online.");    

    if (!document.getElementById("button-host") && !document.getElementById("button-disconnect-host")) {
        $(document.getElementById("div-host")).append("<a href = \"#\" id = \"button-disconnect-host\" class = \"button-class\">Disconnect</a>");
        onDisconnectHost();
        addLine();
    }
}

function onDisconnectHost() {
    let button = document.getElementById("button-disconnect-host");
    button.onclick = function() {
        document.getElementById("button-disconnect-host").remove();

        $(document.getElementById("div-host")).append("<a href = \"#\" id = \"button-host\" class = \"button-class\">Connect</a>");
        onConnectToHost();

        document.getElementById("input-host").disabled = false;
        $("#" + document.getElementById("div-shell").id + ">").remove();
    }
}

function onConnectToHost() {
    let button = document.getElementById("button-host");
    button.onclick = function() {
        checkHost(document.getElementById("input-host").value);
        document.getElementById("button-host").remove();
        document.getElementById("input-host").disabled = true;
    }
}

function checkHost(ipHost) {
    let arrData = [];
    arrData[0] = "ping";
    arrData[1] = ipHost;
    client.sender(toJson(arrData));
}

function toConnect() {
    document.getElementById("button-server").onclick = function() {
        console.log("Click connect button.");
        let ip = document.getElementById("input-server").value;
        client = new ClientWS(ip);
    }
}

function toSend(type, data) {
    console.log(data);
    if (type == "shell")
    {
        keyEvent(data);
        return;
    }
    console.log("Send data to client: " + data);
    client.sender(data);
}

function keyEvent(input) {
    let idBash = historyBash.length - 1;
    console.log(idBash);
    $(input).keyup(function(event) {

        if (event.keyCode == 13) {
            toHistoryBash(input.value);
            console.log(input.value);
            client.sender(toJsonShell(input.value));
            $(input).off("keyup");
            input.disabled = true;
            id++;
        }

        if (event.keyCode == 38) {
            idBash -= 1;
            if (idBash < 0) {
                idBash +=1;
            }
            input.value = fromHistoryBash(idBash);
        }

        if (event.keyCode == 40) {
            idBash += 1;
            if (idBash > historyBash.length - 1) {
                idBash -=1;
            }
            input.value = fromHistoryBash(idBash);
        }
    })
}

function onConnection(status) {
    if (status == "error") {
        console.log("Can not connect to " + client.ipHost);
        alert("Can not connect to " + client.ipHost);
    }
    
    if (status == "connect") {
        console.log("Connected to " + client.ipHost);
        itemsCreater();
    }
}

function onServer(ip) {
    if (ip.indexOf("172.16.") > -1) {
        return false;
    }
    return true;
}

function toHistoryBash(bash) {
    console.log("Add bash to history: " + bash);
    historyBash.push(bash);
}

function fromHistoryBash(idBash) {
    console.log("Select " + idBash + " bash from history: " + historyBash[idBash]);
    return historyBash[idBash];
}