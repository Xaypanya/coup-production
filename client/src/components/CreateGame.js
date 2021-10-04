import React, { Component } from 'react'
import io from "socket.io-client";
import { ReactSortable } from "react-sortablejs";
import Coup from './game/Coup';

const axios = require('axios');
const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"

export default class CreateGame extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            name: '',
            roomCode: '',
            copied: false,
            isInRoom: false,
            isLoading: false,
            players: [],
            isError: false,
            isGameStarted: false,
            errorMsg: '',
            canStart: false,
            socket: null,

        }
    }

    onNameChange = (name) => {
        this.setState({ name });
    }

    joinParty = () => {
        const bind = this
        const socket = io(`${baseUrl}/${this.state.roomCode}`);
        this.setState({ socket });
        console.log("socket created")
        socket.emit('setName', this.state.name);
        
        socket.on("joinSuccess", function() {
            console.log("join successful")
            bind.setState({ 
                isLoading: false,
                isInRoom: true
            });
        })

        socket.on("joinFailed", function(err) {
            console.log("join failed, cause: " + err);
            bind.setState({ isLoading: false });
        })

        socket.on("leader", function() {
            console.log("You are the leader")
        })

        socket.on('partyUpdate', (players) => {
            console.log(players)
            this.setState({ players })
            if(players.length >= 2 && players.map(x => x.isReady).filter(x => x === true).length === players.length) { //TODO CHANGE 2 BACK TO 3
                this.setState({ canStart: true })
            } else {
                this.setState({ canStart: false })
            }
        })

        socket.on('disconnected', function() {
            console.log("ເຈົ້າຂາດການເຊື່ອມຕໍ່ກັບ Server")
        });
    }

    createParty = () => {
        if(this.state.name === '') {
            //TODO  handle error
            console.log('ກະລຸນາປ້ອນຊື່ຜູ້ຫຼິ້ນ');
            this.setState({ errorMsg: '⚠️ ກະລຸນາປ້ອນຊື່ຜູ້ຫຼິ້ນ' });
            this.setState({ isError: true });
            return
        }

        this.setState({ isLoading: true });
        const bind = this;
        axios.get(`${baseUrl}/createNamespace`)
            .then(function (res) {
                console.log(res);
                bind.setState({ roomCode: res.data.namespace, errorMsg: '' });
                bind.joinParty();
            })
            .catch(function (err) {
                //TODO  handle error
                console.log("error in creating namespace", err);
                bind.setState({ isLoading: false });
                bind.setState({ errorMsg: '⚠️ ພົບຂໍ້ຜິດພາກໃນການສ້າງຫ້ອງບໍ່ສາມາດເຂົ້າເຖີງ Server.' });
                bind.setState({ isError: true });
            })
    }

    startGame = () => {
        this.state.socket.emit('startGameSignal', this.state.players)

        this.state.socket.on('startGame', () => {
            this.setState({ isGameStarted: true});
        })
    }

    copyCode = () => {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = this.state.roomCode;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        this.setState({copied: true})
    }

    render() {
        if(this.state.isGameStarted) {
            return (<Coup name={this.state.name} socket={this.state.socket}></Coup>)
        }
        let error = null;
        let roomCode = null;
        let startGame = null;
        let createButton = null;
        let youCanSort = null;
        if(!this.state.isInRoom) {
            createButton = <>
            <button className="createButton" onClick={this.createParty} disabled={this.state.isLoading}><span style={{fontSize: 15}}>{this.state.isLoading ? 'ກຳລັງສ້າງ...': 'ສ້າງ'}</span></button>
            <br></br>
            </>
        }
        if(this.state.isError) {
            error = <b>{this.state.errorMsg}</b>
        }
        if(this.state.roomCode !== '' && !this.state.isLoading) {
            youCanSort = <p>ເຈົ້າສາມາດຈັດລຽງລຳດັບທີຜູ້ຫຼິ້ນໄດ້ ໂດຍການ ລາກ-ວາງ!</p>
            roomCode = <div>
                    <p><b>ລະຫັດຫ້ອງ:</b> <br></br> <br></br><b className="RoomCode" onClick={this.copyCode}>{this.state.roomCode} <span className="iconify" data-icon="typcn-clipboard" data-inline="true"></span></b></p>
                    {this.state.copied ? <b>{"✔️ ບັນທຶກລະຫັດລົງໃນ clipboard ແລ້ວ"}</b> : null}
                </div>
        }
        if(this.state.canStart) {
            startGame = <button  className="startGameButton" onClick={this.startGame}><span style={{fontSize: 15}}>ເລີ່ມເກມ</span></button>
        }
        return (
            <div className="createGameContainer">
                <h4><b>ຊື່ຜູ້ຫຼິ້ນ</b></h4>
                <input
                    type="text" value={this.state.name} disabled={this.state.isLoading || this.state.isInRoom}
                    onChange={e => {
                        if(e.target.value.length <= 9){
                            this.setState({
                                errorMsg: '',
                                isError: false
                            })
                            this.onNameChange(e.target.value);
                        } else {
                            this.setState({
                                errorMsg: '⚠️ ຊື່ຜູ້ຫຼິ້ນຕ້ອງໜ້ອຍກວ່າ 10 ຕົວອັກສອນ',
                                isError: true
                            })
                        }
                        
                    }}
                />
                <br></br>
                {createButton}
                {error}
                <br></br>
                {roomCode}
                {youCanSort}
                <div className="readyUnitContainer">
                    <ReactSortable list={this.state.players} setList={newState => this.setState({ players: newState })}>
                        {this.state.players.map((item,index) => {
                            let ready = null
                            let readyUnitColor = '#cf4f43'
                            if(item.isReady) {
                                ready = <b>ພ້ອມແລ້ວ!</b>
                                readyUnitColor = '#1b9453'
                            } else {
                                ready = <b>ຍັງບໍ່ພ້ອມ</b>
                            }
                            return (
                                    <div className="readyUnit" style={{backgroundColor: readyUnitColor}} key={index}>
                                        <p >{index+1}. {item.name} {ready}</p>
                                    </div>
                            )
                            })
                        }
                    </ReactSortable>
                </div>
                
                {startGame}
            </div>
                
        )
    }
}
