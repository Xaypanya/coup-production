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



export default class BlockDecision extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            isDecisionMade: false,
            decision: '',
            isPickingClaim: false,
            targetAction: ''
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

    block = (block, claim = null) => {
        this.props.closeOtherVotes('block')
        // res.prevAction.action, res.prevAction.target, res.prevAction.source, res.counterAction, res.blockee, res.blocker, res.isBlocking
        let resClaim
        if(claim != null) {
            resClaim = claim;
        } else if(block === 'block_foreign_aid') {
            resClaim = 'duke'
        } else if(block === 'block_assassinate') {
            resClaim = 'contessa'
        } else {
            console.error('unknown claim, line 40')
        }

        const res = {
            prevAction: this.props.action,
            counterAction: {
                counterAction: block,
                claim: resClaim,
                source: this.props.name
            },
            blockee: this.props.action.source,
            blocker: this.props.name,
            isBlocking: true
        }
        console.log(res)
        this.props.socket.emit('g-blockDecision', res)
        this.props.doneBlockVote();
    }

    pass = () => {
        const res = {
            action: this.props.action,
            isBlocking: false
        }
        console.log(res)
        this.props.socket.emit('g-blockDecision', res)
        this.props.doneBlockVote();
    }

    pickClaim = (block) => {
        this.props.closeOtherVotes('block')
        this.setState({ decision: block })
        this.setState({ isPickingClaim: true })
    }

    render() {
        let control = null
        let pickClaim = null
        if(!this.state.isPickingClaim) {
            if(this.props.action.action === 'foreign_aid') {
                control = <>
                <p><b>{this.props.action.source}</b> ກຳລັງຈະທຳການ <b>ການຮັບເງິນຊ່ວຍເຫຼືອ</b></p>
                {/* <button onClick={() => this.block('block_foreign_aid')}>Block Foreign Aid</button> */}
                <button onClick={() => this.block('block_foreign_aid')} className="actionButtons" id="normal">
                            <div>
                                    <img src={imageSource.block_foreign_aid} alt="block_foreign_aid" style={{marginRight: 5}}/>
                                    <span>ປ້ອງກັນການຮັບເງິນຊ່ວຍເຫຼືອ</span>
                            </div>
                  </button>
                </>
            } else if(this.props.action.action === 'steal') {
                control = 
                  <button onClick={() => this.pickClaim('block_steal')} className="actionButtons" id="normal">
                            <div>
                                    <img src={imageSource.block_steal} alt="block_steal" style={{marginRight: 5}}/>
                                    <span>ປ້ອງກັນການຍຶດຫຼຽນ</span>
                            </div>
                  </button>
            } else if(this.props.action.action === 'assassinate') {
                control = 
                 <button onClick={() => this.block('block_assassinate')} className="actionButtons" id="normal">
                            <div>
                                    <img src={imageSource.block_assasinate} alt="block_assasinate" style={{marginRight: 5}}/>
                                    <span>ປ້ອງກັນການສັງຫານ</span>
                            </div>
                  </button>
            }
        } else {
            pickClaim = <>
                <p>ເພື່ອປ້ອງກັນ <b>ການຍຶດຫຼຽນ</b> ເຈົ້າຕ້ອງການໃຊ້ໄພ້ <b>ນັກການທູດ</b> ຫຼື <b>ກັບຕັນ</b>?</p>
                {/* <button onClick={() => this.block(this.state.decision, 'ambassador')}>Ambassador</button> */}
                <button  onClick={() => this.block(this.state.decision, 'ambassador')} className="card_button">
                    <div className="card_button_img_container">
                        <img src="https://cdn.discordapp.com/attachments/821027469028491269/893882364437069844/ambassador.jpg" alt="Ambassador" style={{borderRadius: '0px'}}/>
                        <p>ນັກການທູດ</p>
                    </div>
                </button>
                {/* <button onClick={() => this.block(this.state.decision, 'captain')}>Captain</button> */}
                <button onClick={() => this.block(this.state.decision, 'captain')} className="card_button">
                    <div className="card_button_img_container">
                        <img src="https://cdn.discordapp.com/attachments/821027469028491269/893882370518818916/captain.jpg" style={{borderRadius: '0px'}}  alt="Captain"/>
                        <p>ກັບຕັນ</p>
                    </div>
                </button>
            </>
        }
        
        return (
            <>
               {control}
               {pickClaim}
               {/* <button onClick={() => this.pass()}>Pass</button> */}
            </>
        )
    }
}
