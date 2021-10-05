import React, { Component } from 'react'
import ActionDecision from './ActionDecision';
import ChallengeDecision from './ChallengeDecision';
import BlockChallengeDecision from './BlockChallengeDecision';
import PlayerBoard from './PlayerBoard';
import RevealDecision from './RevealDecision';
import BlockDecision from './BlockDecision';
import ChooseInfluence from './ChooseInfluence';
import ExchangeInfluences from './ExchangeInfluences';
import './CoupStyles.css';
import EventLog from './EventLog';
import ReactModal from 'react-modal';
import RulesModal from '../RulesModal';


const CardImages = {
        duke: "https://cdn.discordapp.com/attachments/821027469028491269/893882361509449768/duke.jpg",
        assassin: "https://cdn.discordapp.com/attachments/821027469028491269/893882367289200701/assassin.jpg",
        captain: "https://cdn.discordapp.com/attachments/821027469028491269/893882370518818916/captain.jpg",
        ambassador: "https://cdn.discordapp.com/attachments/821027469028491269/893882364437069844/ambassador.jpg",
        contessa: "https://cdn.discordapp.com/attachments/821027469028491269/893882374188855326/contessa.jpg",
    };

const imageSource = {
    income: "https://cdn.discordapp.com/attachments/826834529435648000/893876301537099816/income.png",
    coup: "https://cdn.discordapp.com/attachments/826834529435648000/893907064328429639/coup.png",
    foreign_aid: "https://cdn.discordapp.com/attachments/826834529435648000/893876300144586752/foreign_aid.png",
    block_foreign_aid: "https://cdn.discordapp.com/attachments/826834529435648000/893877691902734366/block_foreign_aid.png",
    steal: "https://cdn.discordapp.com/attachments/826834529435648000/893876304640888952/steal.png",
    block_steal: "https://cdn.discordapp.com/attachments/826834529435648000/893876432260968458/block_steal.png",
    assasinate: "https://cdn.discordapp.com/attachments/826834529435648000/893876306717077565/assasiness.png",
    block_assasinate: "https://cdn.discordapp.com/attachments/826834529435648000/893876415429238794/block_assasiness.png",
    tax: "https://cdn.discordapp.com/attachments/826834529435648000/893879790933774376/tax.png",
    exchange: "https://cdn.discordapp.com/attachments/826834529435648000/893876299192500224/exchange.png",
    pass: "https://cdn.discordapp.com/attachments/826834529435648000/893876302996729916/pass.png",
    challenge: "https://cdn.discordapp.com/attachments/826834529435648000/893894193754296360/challenge.png"
}
export default class Coup extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             action: null,
             blockChallengeRes: null,
             players: [],
             playerIndex: null,
             currentPlayer: '',
             isChooseAction: false,
             revealingRes: null,
             blockingAction: null,
             isChoosingInfluence: false,
             exchangeInfluence: null,
             error: '',
             winner: '',
             playAgain: null,
             logs: [],
             isDead: false,
             waiting: true,
             disconnected: false
        }
        const bind = this;

        this.playAgainButton = <>
        <br></br>
        <button className="startGameButton" onClick={() => {
            this.props.socket.emit('g-playAgain');
        }}>ຫຼີ້ນອີກຄັ້ງ</button>
        </>

        this.props.socket.on('disconnect', reason => {
            this.setState({ disconnected: true });
        })

        this.props.socket.on('g-gameOver', (winner) => {
            bind.setState({winner: `ຜູ້ຊະນະໄດ້ແກ່ ${winner}!`})
            bind.setState({playAgain: bind.playAgainButton})
        })
        this.props.socket.on('g-updatePlayers', (players) => {
            bind.setState({playAgain: null})
            bind.setState({winner: null})
            players = players.filter(x => !x.isDead);
            let playerIndex = null;
            for(let i = 0; i < players.length; i++) {
                console.log(players[i].name, this.props.name)
                if(players[i].name === this.props.name) {
                    playerIndex = i;
                    break;
                }
            }
            if(playerIndex == null) {
                this.setState({ isDead: true })
            }else {
                this.setState({ isDead: false})
            }
            console.log(playerIndex)
            bind.setState({playerIndex, players});
            
        });
        this.props.socket.on('g-updateCurrentPlayer', (currentPlayer) => {
            console.log('currentPlayer: ', currentPlayer)
            bind.setState({ currentPlayer });
        });
        this.props.socket.on('g-addLog', (log) => {
            let splitLog=  log.split(' ');
            let coloredLog = [];
            coloredLog = splitLog.map((item, index) => {
                let found = null
                bind.state.players.forEach(player => {
                    if(item === player.name){
                        found = <b style={{color: player.colorText}}>{player.name} </b>;
                    }
                })
                if(found){
                    return found;
                }
                return <>{item+' '}</>
            })
            bind.state.logs = [...bind.state.logs, coloredLog]
            bind.setState({logs :bind.state.logs})
        })
        this.props.socket.on('g-chooseAction', () => {        
            bind.setState({ isChooseAction: true})
        });
        this.props.socket.on('g-openExchange', (drawTwo) => {
            let influences = [...bind.state.players[bind.state.playerIndex].influences, ...drawTwo];
            bind.setState({ exchangeInfluence: influences });
        })
        this.props.socket.on('g-openChallenge', (action) => {
            if(this.state.isDead) {
                return
            }
            if(action.source !== bind.props.name) {
               bind.setState({ action }) 
            } else {
                bind.setState({ action: null }) 
            }
        });
        this.props.socket.on('g-openBlockChallenge', (blockChallengeRes) => {
            if(this.state.isDead) {
                return
            }
            if(blockChallengeRes.counterAction.source !== bind.props.name) {
               bind.setState({ blockChallengeRes }) 
            } else {
                bind.setState({ blockChallengeRes: null }) 
            }
        });
        this.props.socket.on('g-openBlock', (action) => {
            if(this.state.isDead) {
                return
            }
            if(action.source !== bind.props.name) {
                bind.setState({ blockingAction: action })
             } else {
                 bind.setState({ blockingAction: null }) 
             }
        });
        this.props.socket.on('g-chooseReveal', (res) => {
            console.log(res)
            bind.setState({ revealingRes: res});
        });
        this.props.socket.on('g-chooseInfluence', () => {
            bind.setState({ isChoosingInfluence: true });
        });
        this.props.socket.on('g-closeChallenge', () => {
            bind.setState({ action: null });
        });
        this.props.socket.on('g-closeBlock', () => {
            bind.setState({ blockingAction: null });
        });
        this.props.socket.on('g-closeBlockChallenge', () => {
            bind.setState({ blockChallengeRes: null });
        });
    }

    deductCoins = (amount) => {
        let res = {
            source: this.props.name,
            amount: amount
        }
        this.props.socket.emit('g-deductCoins', res);
    }

    doneAction = () => {
        this.setState({ 
            isChooseAction: false
        })
    }
    doneChallengeBlockingVote = () => {
        this.setState({ action: null }); //challemge
        this.setState({ blockChallengeRes: null}); //challenge a block
        this.setState({ blockingAction: null }); //block
    }
    closeOtherVotes = (voteType) => {
        if(voteType === 'challenge') {
            this.setState({ blockChallengeRes: null}); //challenge a block
            this.setState({ blockingAction: null }); //block
        }else if(voteType === 'block') {
            this.setState({ action: null }); //challemge
            this.setState({ blockChallengeRes: null}); //challenge a block
        }else if(voteType === 'challenge-block') {
            this.setState({ action: null }); //challemge
            this.setState({ blockingAction: null }); //block
        }
    }
    doneReveal = () => {
        this.setState({ revealingRes: null });
    }
    doneChooseInfluence = () => {
        this.setState({ isChoosingInfluence: false })
    }
    doneExchangeInfluence = () => {
        this.setState({ exchangeInfluence: null })
    }
    pass = () => {
        if(this.state.action != null) { //challengeDecision
            let res = {
                isChallenging: false,
                action: this.state.action
            }
            console.log(res)
            this.props.socket.emit('g-challengeDecision', res);
        }else if(this.state.blockChallengeRes != null) { //BlockChallengeDecision
            let res = {
                isChallenging: false
            }
            console.log(res)
            this.props.socket.emit('g-blockChallengeDecision', res);
        }else if(this.state.blockingAction !== null) { //BlockDecision
            const res = {
                action: this.state.blockingAction,
                isBlocking: false
            }
            console.log(res)
            this.props.socket.emit('g-blockDecision', res)
        }
        this.doneChallengeBlockingVote();
    }

  

  
    
    render() {
        const avatarImageSources = [
            "images/avatar_1.svg",
            "images/avatar_2.svg",
            "images/avatar_3.svg",
            "images/avatar_4.svg",
            "images/avatar_5.svg",
            "images/avatar_6.svg",
            "images/avatar_7.svg",
            "images/avatar_8.svg",
            "images/avatar_9.svg",
            "images/avatar_10.svg",
        ]

        function CardImageTranslate(influence){
            if(influence === "assassin"){
                return CardImages.assassin;
            }
            if(influence === "captain"){
                return CardImages.captain;
            }
            if(influence === "duke"){
                return CardImages.duke;
            }
            if(influence === "ambassador"){
                return CardImages.ambassador;
            }
            if(influence === "contessa"){
                return CardImages.contessa;
            }
        }

        const newCardTranslated = {
            duke: "ຂຸນນາງ",
            assassin: "ມືສັງຫານ",
            ambassador: "ນັກການທູດ",
            captain: "ກັບຕັນ",
            contessa: "ຄອນເທສຊາ",
        }

        function translatedCard(cardName){
            if(cardName === "duke"){
                return newCardTranslated.duke;
            }
            if(cardName === "assassin"){
                return newCardTranslated.assassin;
            }
            if(cardName === "ambassador"){
                return newCardTranslated.ambassador;
            }
            if(cardName === "captain"){
                return newCardTranslated.captain;
            }
            if(cardName === "contessa"){
                return newCardTranslated.contessa;
            }
         
        }
            
        
        let actionDecision = null
        let currentPlayer = null
        let revealDecision = null
        let challengeDecision = null
        let blockChallengeDecision = null
        let chooseInfluenceDecision = null
        let blockDecision = null
        let influences = null
        let pass = null
        let coins = null
        let exchangeInfluences = null
        let playAgain = null
        let isWaiting = true
        let waiting = null
        if(this.state.isChooseAction && this.state.playerIndex != null) {
            isWaiting = false;
            actionDecision = <ActionDecision doneAction={this.doneAction} deductCoins={this.deductCoins} name={this.props.name} socket={this.props.socket} money={this.state.players[this.state.playerIndex].money} players={this.state.players}></ActionDecision>
        }
        if(this.state.currentPlayer) {
            currentPlayer = <p>🎲 ຕາຂອງ <b>{this.state.currentPlayer}</b></p>
        }
        if(this.state.revealingRes) {
            isWaiting = false;
            revealDecision = <RevealDecision doneReveal={this.doneReveal} name ={this.props.name} socket={this.props.socket} res={this.state.revealingRes} influences={this.state.players.filter(x => x.name === this.props.name)[0].influences}></RevealDecision>
        }
        if(this.state.isChoosingInfluence) {
            isWaiting = false;
            chooseInfluenceDecision = <ChooseInfluence doneChooseInfluence={this.doneChooseInfluence} name ={this.props.name} socket={this.props.socket} influences={this.state.players.filter(x => x.name === this.props.name)[0].influences}></ChooseInfluence>
        }
        if(this.state.action != null || this.state.blockChallengeRes != null || this.state.blockingAction !== null){
            pass = 
                <button onClick={() => this.pass()} className="actionButtons" id="normal">
                            <div>
                                    <img src={imageSource.pass} alt="pass" style={{marginRight: 5}}/>
                                    <span>ຜ່ານ</span>
                            </div>
                </button>
        }
        if(this.state.action != null) {
            isWaiting = false;
            challengeDecision = <ChallengeDecision closeOtherVotes={this.closeOtherVotes} doneChallengeVote={this.doneChallengeBlockingVote} name={this.props.name} action={this.state.action} socket={this.props.socket} ></ChallengeDecision>
        }
        if(this.state.exchangeInfluence) {
            isWaiting = false;
            exchangeInfluences = <ExchangeInfluences doneExchangeInfluence={this.doneExchangeInfluence} name={this.props.name} influences={this.state.exchangeInfluence} socket={this.props.socket}></ExchangeInfluences>
        }
        if(this.state.blockChallengeRes != null) {
            isWaiting = false;
            blockChallengeDecision = <BlockChallengeDecision closeOtherVotes={this.closeOtherVotes} doneBlockChallengeVote={this.doneChallengeBlockingVote} name={this.props.name} prevAction={this.state.blockChallengeRes.prevAction} counterAction={this.state.blockChallengeRes.counterAction} socket={this.props.socket} ></BlockChallengeDecision>
        }
        if(this.state.blockingAction !== null) {
            isWaiting = false;
            blockDecision = <BlockDecision closeOtherVotes={this.closeOtherVotes} doneBlockVote={this.doneChallengeBlockingVote} name={this.props.name} action={this.state.blockingAction} socket={this.props.socket} ></BlockDecision>
        }
        if(this.state.playerIndex != null && !this.state.isDead) {
            influences = <>
            <p className="influenceTitle">ໄພ້ຂອງເຈົ້າ</p>
                {this.state.players[this.state.playerIndex].influences.map((influence, index) => {

                    console.log("my influence",influence)

                    return  <div key={index} className="InfluenceUnitContainer">
                                <br></br>
                                <img src={CardImageTranslate(influence)} style={{width: 120}}/>
                                <h3>{translatedCard(influence)}</h3>
                            </div>
                    })
                }
            </>
            
            coins = <p>{this.state.players[this.state.playerIndex].money}</p>
        }
        if(isWaiting && !this.state.isDead) {
            waiting = <p>ກະລຸນາລໍຖ້າຜູ້ຫຼິ້ນຄົນອື່ນ...</p>
        }
        if(this.state.disconnected) {
            return (
                <div className="GameContainerError">
                    <p>ເຈົ້າໄດ້ຂາດການເຊື່ອມຕໍ່ກັບ Server :c</p>
                    <p>ກະລຸນາແຈ້ງຫົວຫ້ອງເພື່ອສ້າງຫ້ອງຫຼິ້ນໃໝ່</p>
                    <p>ຂໍອະໄພໃນຄວາມອ່ອນຂອງທີມພັດທະນາ (シ_ _)シ</p>
                </div>
            )
        }

        var ramdomNumber = Math.floor(Math.random() * 10);

        return (
            <div className="GameContainer">
                <div className="GameHeader">
                    <div className="playerInfoBox">
                    <div className="PlayerInfo">
                        <div className="playerInfoName">
                            <img src={avatarImageSources[0]} alt="avatar"/>
                            <p>{this.props.name}</p>
                        </div>
                        <div className="playerInfoName">
                            <img src="https://cdn.discordapp.com/attachments/826834529435648000/893876460429910087/coin.png" alt="sss"/>
                            {coins}
                        </div>
                        
                    </div>
                    <div className="modals">
                    <RulesModal/>
                    </div>
                    </div>
                    <div className="eventLogBox">
                        <div className="CurrentPlayer">
                            {currentPlayer}
                        </div>
                        <EventLog logs={this.state.logs}></EventLog>
                    </div>
                </div>
              

                <div className="InfluenceSection">
                    {influences}
                </div>
                <PlayerBoard players={this.state.players}></PlayerBoard>
                <div className="DecisionsSection">
                    {waiting}
                    {revealDecision}
                    {chooseInfluenceDecision}
                    {actionDecision}
                    {exchangeInfluences}
                    {challengeDecision}
                    {blockChallengeDecision}
                    {blockDecision}
                    {pass}
                    {playAgain}
                </div>
                <h3>{this.state.winner}</h3>
                {this.state.playAgain}
            </div>
        )
    }
}
