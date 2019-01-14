function addMain() {
    let items = "<div id = \"div-buttons\" class = \"div-buttons-class\"></div>" +
        "<div id = \"div-main\" class = \"div-main-class\">" +
        "<div id = \"div-host\" class = \"div-host-class\">" +
        "<span>IP remote host: </span>" +
        "<input id = \"input-host\"></input>" +
        "<a href=\"#\" id = \"button-host\" class = \"button-class\">Connect</a>" +
        "</div><div id = \"div-shell\" class = \"div-shell-class\"></div>" +
        "</div>";

    $("body").append(items); 
}

function addButtons() {
    let buttons = "<button id = \"button-xorg\" onclick=\"addChanger('" + XORG + "');\">XORG</button>" +
        "<button id = \"button-reboot\" onclick=\"addChanger('" + REBOOT + "');\">REBOOT</button>" +
        "<button id = \"button-info\" onclick=\"addChanger('" + INFO + "');\">INFO</button>" +
        "<button id = \"button-kind\" onclick=\"addChanger('" + KIND + "');\">KIND</button>" +
        "<button id = \"button-hall-xorg\" onclick=\"addChanger('" + HALL_XORG + "');\">HALL XORG</button>" +
        "<button id = \"button-hall-reboot\" onclick=\"addChanger('" + HALL_REBOOT + "');\">HALL REBOOT</button>" +
        "<button id = \"button-hall-kind\" onclick=\"addChanger('" + HALL_KIND + "');\">HALL KIND</button>" +
        "<button id = \"button-hall-ping\" onclick=\"addChanger('" + HALL_PING + "');\">HALL PING</button>" +
        "<button id = \"button-ping\" onclick=\"addChanger('" + PING + "');\">PING</button>";

    $("#div-buttons").append(buttons);
}

function addResultLine(data) {
    let line = "<div id = \"div-shell-line\" class = \"div-shell-line-class\"><span class = \"span-result\">" + data + "</span></div>";
    $("#div-shell").append(line);
}

function addLogLine(data) {
    let item = "<div><span>" + data + "</span></div>";
    $(document.getElementById("div-logger")).append(item);
}

function addLogger() {
    let logger = "<div id = \"div-logger\" class = \"div-logger-class\"></div>";

    $("body").append(logger);
}

function addLine() {
    let item = "<div id = \"div-shell-line\" class = \"div-shell-line-class\">" +
    "<div id = \"div-line-hostname\"><span class = \"span-host\">root@" + document.getElementById("input-host").value + ":$</span></div>" + 
    "<div id = \"div-line-bash\"><input id = \"" + id + "-input\"></input></div></div>";
    $("#div-shell").append(item);
    let input = document.getElementById(id + "-input");
    input.focus();
    toSend("shell", document.getElementById(id + "-input"));
}

function addResultPing(ip, result) {
    let item;
    if (result == "1") {
        item = "Host " + ip + " is online.";
    } else {
        item = "Host " + ip + " is offline.";
    }

    addLogLine(item);
}

function addChanger(data) {
    let changer = document.getElementById("div-changer");

    if (changer) {
        $(changer).remove();
    }

    let jsonArr = [];
    let block;
    
    changer = "<div id = \"div-changer\" class = \"div-changer-class\"><div></div></div>";
    $("body").append(changer);

    changer = document.getElementById("div-changer");
    
    console.log("Added block: " + data);

    if (data == "reboot") {
        block = "<h3>Reboot TK</h3><span>IP TK:</span><input id = \"input-tk\"></input>";
        $("#" + changer.id + ">div").append(block);
        jsonArr = [data, document.getElementById("input-tk")];
    }

    if (data == "hall_reboot") {
        block = "<h3>Reboot hall</h3><span>Hall number:</span><input id = \"input-hall\"></input>";
        $("#" + changer.id + ">div").append(block);
    }

    if (data == "info") {
        block = "<h3>Get info TK</h3><span>IP TK:</span><input id = \"input-tk\"></input>";
        $("#" + changer.id + ">div").append(block);
    }

    if (data == "kind") {
        block = "<h3>Change kind TK</h3><span>IP TK:</span><input id = \"input-tk\"></input>" +
        "<span>Kind TK:</span><input id = \"input-kind\"></input>";
        $("#" + changer.id + ">div").append(block);
    }

    if (data == "hall_kind") {
        block = "<h3>Change kind hall</h3><span>Hall number:</span><input id = \"input-hall\"></input>" +
        "<span>Kind TK:</span><input id = \"input-kind\"></input>";
        $("#" + changer.id + ">div").append(block);
    }

    if (data == "xorg") {
        block = "<h3>Restart xorg on TK</h3><span>IP TK:</span><input id = \"input-tk\"></input>";
        $("#" + changer.id + ">div").append(block);
    }

    if (data == "hall_xorg") {
        block = "<h3>Restart xorg on hall</h3><span>Hall number:</span><input id = \"input-hall\"></input>";
        $("#" + changer.id + ">div").append(block);
    }

    if (data == "hall_ping") {
        block = "<h3>Status hall</h3><span>Hall number:</span><input id = \"input-hall\"></input>";
        $("#" + changer.id + ">div").append(block);
    }

    if (data == "ping") {
        block = "<h3>Status TK</h3><span>IP TK:</span><input id = \"input-tk\"></input>";
        $("#" + changer.id + ">div").append(block);
    }
    
    let button = "<button id = \"button-send\">Send</button>";
    $("#" + changer.id + ">div").append(button);

    $(document.getElementById("button-send")).click(function() {

        let tk = document.getElementById("input-tk");
        let hall = document.getElementById("input-hall");
        let kind = document.getElementById("input-kind");

        if (tk) {
            let tkValue = tk.value;
            let ipList = tkValue.split(",");
            console.log(ipList);
            jsonArr[1] = ipList;
        }

        if (hall) {
            jsonArr[1] = hall.value;
            if (data == "hall_ping") {
                jsonArr[2] = data;
                data = "ping";
            }
        }

        if (kind) {
            jsonArr[2] = kind.value;
        }

        jsonArr[0] = data;

        console.log(jsonArr[0]);
        
        console.log("Json Array to send:" + jsonArr);
        toSend(data, toJson(jsonArr));
    });
}