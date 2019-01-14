function toJson(data) {
    let jsonData;

    if (data[0] == "ping") {
        if (data[2] == "hall_ping") {
            jsonData = {
                hall: data[1],
                method: "ping"
            };

            console.log("Json created: " + jsonData);
            return JSON.stringify(jsonData);
        }

        jsonData = {
            host_ping: data[1],
            method: data[0]
        };
    }

    if (data[0] == "xorg") {
        jsonData = {
            host_tk: data[1],
            method: data[0]
        };
    }

    if (data[0] == "reboot") {
        jsonData = {
            host_tk: data[1],
            method: data[0]
        };
    }

    if (data[0] == "info") {
        jsonData = {
            host_tk: data[1],
            method: data[0]
        };
    }

    if (data[0] == "kind") {
        jsonData = {
            host_tk: data[1],
            type: data[2],
            method: data[0]
        };
    }

    if (data[0] == "hall_kind") {
        jsonData = {
            hall: data[1],
            type: data[2],
            method: "kind"
        };
    }

    if (data[0] == "hall_xorg") {
        jsonData = {
            hall: data[1],
            method: "xorg"
        };
    }

    if (data[0] == "hall_reboot") {
        jsonData = {
            hall: data[1],
            method: "reboot"
        };
    }
    
    console.log("Json created: " + jsonData);
    return JSON.stringify(jsonData);
}

function toJsonShell(data) {
    let jsonData;
    remoteHost = document.getElementById("input-host").value;

    if (onServer(remoteHost)) {
        jsonData = {
            host_server: remoteHost,
            method: "shell",
            bash: [data]
        };
    } else {
        jsonData= {
            host_tk: remoteHost,
            method: "shell",
            bash: [data]
        };

    }
    
    return JSON.stringify(jsonData);
}

function fromJson(data) {
    let jsonData = JSON.parse(data);

    if (jsonData.method == "error") {
        addLogLine(jsonData.error);
    }

    if (jsonData.method == "ping") {
        onStateHost(jsonData.host_ping, jsonData.result);
    }

    if (jsonData.method != "shell") {
        return;
    }

    addResultLine(jsonData.result);
    addLine();
}