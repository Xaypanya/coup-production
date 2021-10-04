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
export default class ChallengeDecision extends Component {

    // constructor(props) {
    //     super(props)
    // }

    vote = (isChallenging) => {
        this.props.closeOtherVotes('challenge')

        const res = {
            action: this.props.action,
            isChallenging,
            challengee: this.props.action.source,
            challenger: this.props.name
        }
        console.log(res)
        this.props.socket.emit('g-challengeDecision', res);
        this.props.doneChallengeVote();
    }

    challengeText = (action, source, target) => {
        if(action === 'steal') {
            return <p><b>{source}</b> ກຳລັງຈະ <b>ຍຶດຫຼຽນ</b> ຂອງ <b>{target}</b></p>
        }else if(action === 'tax') {
            return <p><b>{source}</b> ກຳລັງຈະ <b>ເກັບພາສີ (3 ຫຼຽນ)</b></p>
        }else if(action === 'assassinate') {
            return <p><b>{source}</b> ກຳລັງຈະ <b>ສັງຫານ</b> <b>{target}</b></p>
        }else if(action === 'exchange') {
            return <p><b>{source}</b> ກຳລັງຈະ <b>ປ່ຽນໄພ້</b></p>
        }
    }

    render() {
        return (
            <>
                {this.challengeText(this.props.action.action, this.props.action.source, this.props.action.target)}
                {/* <button onClick={() => this.vote(true)}>Challenge</button> */}
                <button onClick={() => this.vote(true)} className="actionButtons" id="normal">
                            <div>
                                    <img src={imageSource.challenge} alt="challenge" style={{marginRight: 5}}/>
                                    <span>ທ້າທາຍ</span>
                            </div>
                </button>
                {/* <button onClick={() => this.vote(false)}>Pass</button> */}
            </>
        )
    }
}
