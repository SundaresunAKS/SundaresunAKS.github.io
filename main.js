var url = "ws://localhost:9000";
var ws = null;
let connectionStatus = document.getElementById("connectionStatus");

var onOpen = function() {
    console.log('onOpen Called: ' + url); 
    connectionStatus.innerHTML = "Connected"
    messageBox("Connected");
};

var onClose = function() {
    console.log('onClose Called..');
    connectionStatus.innerHTML = "Closed"
    messageBox("Closed");
    ws = null;
};

var onMessage = function(event) {
    var data = event.data;
    // alert(data);
    console.log("onMessage:: "+ data);
};
 
var onError = function(event) {
    alert("WebSocket Error: "+event.data);
    ws = null;
    connectionStatus.innerHTML = "onError"
    messageBox("onError");
     
}

function WebSocketSend(messgae){
    if(ws == null){
        console.log("WebSocketSend:: Error, bz WS is NULL");
        return;
    }
    ws.send(messgae);
    messageBox("WebSocketSend: "+ messgae);
}

function WebSocketConnect() {
    if ("WebSocket" in window) {
        if(ws === null){
            url = document.getElementById("serverAddress").value;
            url = "ws://"+url;
            console.log("WebSocketConnect:: "+url);
            ws = new WebSocket(url);
            ws.onopen = onOpen;
            ws.onclose = onClose;
            ws.onmessage = onMessage;
            ws.onerror = onError;
            console.log("WebSocketConnect:: Websocket Created...");
        }
    } else {
        alert("WebSocket NOT supported by your Browser!");
    }
}

function WebSocketDisconnect() {
    if(ws != null){
        ws.close();
        console.log("WebSocketDisconnected....");
        return;
    }
    console.log("WebSocket Not created...");
    alert("WebSocket Not created...");
}

function handleMessage(type, message){
   console.log("handleMessage:: " + type+" "+message);
   if(type == "connect"){
      WebSocketConnect();
   }
   if(type == "Switch1"){
      var msg = "Switch1,"+message;
      WebSocketSend(msg);
   }
   if(type == "Switch2"){
    var msg = "Switch2,"+message;
    WebSocketSend(msg);
 }
}

var logBuffer="";
function messageBox(message){
    // var messages = document.getElementById("messages");
    // messages.append(message);
    logBuffer = logBuffer+"// "+message;
    document.getElementById("messages").textContent = logBuffer;
}

console.log("main.js Loaded........");
