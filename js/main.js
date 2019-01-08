var id = 0;
var client;
var historyBash = [""];

function main() {
    let items = ["<input id = \"input-host\" class = \"input-class\"></input>",
                "<a href=\"#\" id = \"button-host\" class = \"button-class\">Connect</a>"];

    console.log("Before addElements...Item is " + $("#div-host"));
    addElements($("#div-host"), items);
}

function addElements(idItem, items) {
    console.log("Array items: " + items);
    for (let i = 0; i < items.length; i++) {
        console.log("Add item: " + items[i]);
        idItem.append(items[i]);
    }
    toConnect(document.getElementById('button-host'));
}

function toConnect(item) {
    item.onclick = function() {
        console.log("Click connect button.");
        let ip_ws = document.getElementById("input-host").value;
        client = new ClientWS(ip_ws);
    }
}

function toSend() {
    let input = document.getElementById(id + "-input");
    keyEvent(input);
}

function keyEvent(input) {
    let idBash = historyBash.length - 1;
    $(input).keyup(function(event) {
        if (event.keyCode == 13) {
            toHistoryBash(input.value);
            client.sender(toJson(input.value));
            $(input).off('keyup');
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

function onStatus(status) {
    let line;
    $("#div-host>div").remove();
    if (status == "error") {
        line = "<div><span>Can not connect to " + client.ipHost + "</span></div>";
    }
    
    if (status == "online") {
        line = "<div><span>Connected to " + client.ipHost + "</span></div>";
    }
    $("#div-host").append(line);
}

function addLine() {
    let line = "<div id = \"div-shell-line\" class = \"div-shell-line-class\"><div id = \"div-line-hostname\"><span class = \"span-host\">root@" + client.ipHost + ":$</span></div><div id = \"div-line-bash\"><input id = \"" + id + "-input\"></input></div></div>";
    console.log("addLine");
    $("#div-shell").append(line);
    let input = document.getElementById(id + "-input");
    input.focus();
    toSend();
}

function addResultLine(data) {
    let line = "<div id = \"div-shell-line\" class = \"div-shell-line-class\"><span class = \"span-result\">" + data + "</span></div>";
    $("#div-shell").append(line);
}

function toJson(data) {
    let jsonData = {
        host_tk: client.getHost,
        method: "bash",
        bash: data
    };
    return JSON.stringify(jsonData);
}

function fromJson(data) {
    let jsonData = JSON.parse(data);
    if (jsonData.method != "bash") {
        return;
    }
    addResultLine(jsonData.result);
    addLine();
}

function toHistoryBash(bash) {
    console.log("Add bash to history: " + bash);
    historyBash.push(bash);
}

function fromHistoryBash(idBash) {
    console.log("Select " + idBash + " bash from history: " + historyBash[idBash]);
    return historyBash[idBash];
}