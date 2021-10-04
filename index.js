const express = require('express');
const moment = require('moment');

// Server/express setup
const app = express();
const cors = require('cors');
// app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const CoupGame = require('./game/coup');
const path = require('path');

const utilities = require('./utilities/utilities');


const whitelist = ['https://kaidao-coup.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));





if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }


// Constants
const port = 8000;

let namespaces = {}; //AKA party rooms


app.get('/createNamespace', function (req, res) { 
    let newNamespace = '';
    while(newNamespace === '' || (newNamespace in namespaces)) {
        newNamespace = utilities.generateNamespace(); //default length 6
    }
    const newSocket = io.of(`/${newNamespace}`);
    openSocket(newSocket, `/${newNamespace}`);
    namespaces[newNamespace] = null;
    console.log(newNamespace + " CREATED")
    res.json({namespace: newNamespace});
})

app.get('/exists/:namespace', function (req, res) { //returns bool
    const namespace = req.params.namespace;
    res.json({exists: (namespace in namespaces)});
})

//game namespace: oneRoom
openSocket = (gameSocket, namespace) => {
    let players = []; //includes deleted for index purposes
    let partyMembers = []; //actual members
    let partyLeader = ''
    let started = false;

    gameSocket.on('connection', (socket) => {
        console.log('id: ' + socket.id);
        players.push({
            "player": '',
            "socket_id": `${socket.id}`,
            "isReady": false
        })
        console.log(`player ${players.length} has connected`);
        socket.join(socket.id);
        console.log('socket joined ' + socket.id);
        const index = players.length-1;

        const updatePartyList = () => {
            partyMembers = players.map(x => {
                return {name: x.player, socketID: x.socket_id, isReady: x.isReady}
            }).filter(x => x.name != '')
            console.log(partyMembers);
            gameSocket.emit('partyUpdate', partyMembers) ;
        }

        // socket.on('g-actionDecision', (action) => {
        //     namespaces[namespace].onChooseAction(action);
        // })

        socket.on('setName', (name) => { //when client joins, it will immediately set its name
            console.log(started)
            if(started) {
                gameSocket.to(players[index].socket_id).emit("joinFailed", 'game_already_started');
                return
            }
            if(!players.map(x => x.player).includes(name)){
                if(partyMembers.length >= 6) {
                    gameSocket.to(players[index].socket_id).emit("joinFailed", 'party_full');
                } else {
                    if(partyMembers.length == 0) {
                        partyLeader = players[index].socket_id;
                        players[index].isReady = true;
                        gameSocket.to(players[index].socket_id).emit("leader");
                        console.log("PARTY LEADER IS: " + partyLeader);
                    }
                    players[index].player = name;
                    console.log(players[index]);
                    updatePartyList();
                    gameSocket.to(players[index].socket_id).emit("joinSuccess", players[index].socket_id);
                }
                
            } else {
                gameSocket.to(players[index].socket_id).emit("joinFailed", 'ຊື່ຊ້ຳກັບຜູ້ຫຼີ້ນອື່ນ');
            }  
        })
        socket.on('setReady', (isReady) => { //when client is ready, they will update this
            console.log(`${players[index].player} is ready`);
            players[index].isReady = isReady;
            updatePartyList();
            gameSocket.to(players[index].socket_id).emit("readyConfirm");
        })

        socket.on('startGameSignal', (players) => {
            started = true;
            gameSocket.emit('startGame');
            startGame(players, gameSocket, namespace);
        })
    
        socket.on('disconnect', () => {
            console.log('disconnected: ' + socket.id);
            players.map((x,index) => {
                if(x.socket_id == socket.id) {
                    gameSocket.emit('g-addLog', `${JSON.stringify(players[index].player)} ໄດ້ຂາດການເຊື່ອມຕໍ່!`);
                    gameSocket.emit('g-addLog', 'ຫົວຫ້ອງກະລຸນາສ້າງຫ້ອງເພື່ອຫຼີ້ນໃໝ່.');
                    gameSocket.emit('g-addLog', 'ຂໍອະໄພນຳຄວາມອ່ອນຂອງທີມພັດທະນາ (シ_ _)シ');
                    players[index].player ='';
                    if(socket.id === partyLeader) {
                        console.log('Leader has disconnected');
                        gameSocket.emit('leaderDisconnect', 'leader_disconnected');
                        socket.removeAllListeners();
                        delete io.nsps[namespace];
                        delete namespaces[namespace.substring(1)]
                        players = [];
                        partyMembers = []
                    }
                }
            })
            console.log(Object.keys(gameSocket['sockets']).length)
            updatePartyList();
        })
    });
    let checkEmptyInterval = setInterval(() => {
        // console.log(Object.keys(namespaces))
        if(Object.keys(gameSocket['sockets']).length == 0) {
            delete io.nsps[namespace];
            if(namespaces[namespace] != null) {
                delete namespaces[namespace.substring(1)]
            }
            clearInterval(checkEmptyInterval)
            console.log(namespace 
                + 'deleted')
        }
    }, 10000)
}

startGame = (players, gameSocket, namespace) => {
    namespaces[namespace.substring(1)] = new CoupGame(players, gameSocket);
    namespaces[namespace.substring(1)].start();
}

server.listen(process.env.PORT || port, function(){
    console.log(`listening on ${process.env.PORT || port}`);
});