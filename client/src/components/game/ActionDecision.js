import React, { Component } from 'react'

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
export default class ActionDecision extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isDecisionMade: false,
            decision: '',
            isPickingTarget: false,
            targetAction: '',
            actionError: ''
        }
    }

    chooseAction = (action, target = null) => {
        const res = {
            action: {
                action: action,
                target: target,
                source: this.props.name
            }
        }
        console.log(res)
        
        this.props.socket.emit('g-actionDecision', res)
        this.props.doneAction();
    }

    deductCoins = (action) => {
        console.log(this.props.money, action)
        if(action === 'assassinate') {
            if(this.props.money >= 3) {
                this.props.deductCoins(3);
                this.pickingTarget('assassinate');
            } else {
                this.setState({ actionError: 'ຫຼຽນບໍ່ພໍ, ຕ້ອງໃຊ້ຢ່າງໜ່ອຍ 3 ຫຼຽນເພື່ອ "ສັງຫານ!".'})
            }
        } else if(action === 'coup') {
            if(this.props.money >= 7) {
                this.props.deductCoins(7);
                this.pickingTarget('coup');
            } else {
                this.setState({ actionError: 'ຫຼຽນບໍ່ພໍ, ຕ້ອງໃຊ້ຢ່າງໜ່ອຍ 7 ຫຼຽນເພື່ອ "ລັດຖະປະຫານ!".'})
            }
        }
    }

    pickingTarget = (action) => {
        this.setState({
            isPickingTarget: true,
            targetAction: action,
            actionError: ''
        });
        this.setState({targetAction: action});
    }

    pickTarget = (target) => {
        this.chooseAction(this.state.targetAction, target);
    }

    render() {
        let controls = null
        if(this.state.isPickingTarget) {
            controls = this.props.players.filter(x => !x.isDead).filter(x => x.name !== this.props.name).map((x, index) => {
                return <button className="target_button" style={{ backgroundColor: x.color}} key={index} onClick={() => this.pickTarget(x.name)}><p style={{color: '#000'}}>{x.name}</p></button>
            })
        } else if(this.props.money < 10) {
           controls = ( 
           <>   
                <button className="actionButtons" id="normal" onClick={() => this.chooseAction('income')}>
                    <div>
                        <img src={imageSource.income} alt="income"/>
                        <span>ເງິນເດືອນ</span>
                    </div>
                </button>
                <button className="actionButtons" id="normal" onClick={() => this.deductCoins('coup')}>
                    <div>
                        <img src={imageSource.coup} alt="coup"/>
                        <span>ລັດຖະປະຫານ</span>
                    </div>
                </button>
                <button className="actionButtons" id="normal" onClick={() => this.chooseAction('foreign_aid')}>
                        <div>
                                <img src={imageSource.foreign_aid} alt="foreign_aid"/>
                                <span>ເງິນຊ່ວຍເຫຼືອ</span>
                        </div>
                </button>
                <button className="actionButtons" id="captain" onClick={() => this.pickingTarget('steal')}>
                        <div>
                                <img src={imageSource.steal} alt="steal"/>
                                <span>ຍຶດຫຼຽນ</span>
                        </div>
                </button>
                <button className="actionButtons" id="assassin" onClick={() => this.deductCoins('assassinate')}>
                        <div>
                                <img src={imageSource.assasinate} alt="assasinate"/>
                                <span>ສັງຫານ</span>
                        </div>
                </button>
                <button className="actionButtons" id="duke" onClick={() => this.chooseAction('tax')}>
                <div>
                                <img src={imageSource.tax} alt="tax"/>
                                <span>ເກັບພາສີ</span>
                        </div>
                </button>
                <button className="actionButtons" id="ambassador" onClick={() => this.chooseAction('exchange')}>
                    <div>
                                    <img src={imageSource.exchange} alt="exchange"/>
                                    <span>ປ່ຽນໄພ້</span>
                            </div>
                </button>
           </> 
           )
        } else { //money over 10, has to coup
            controls = <button onClick={() => this.deductCoins('coup')}>
                    <div>
                        <img src={imageSource.coup} alt="coup"/>
                        <span>ລັດຖະປະຫານ</span>
                    </div>
                    </button>
        }
        return (<>

            <p className="DecisionTitle"><b>ເລືອກຄວາມສາມາດ / ເຫດການ</b></p>
            {this.state.actionError && <p className="errorTitleDecision">⚠️ {this.state.actionError}</p>}
            <div className="DecisionButtonsContainer">
               {controls}
            </div>
            </>
        )
    }
}
