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

export default class BlockChallengeDecision extends Component {

    vote = (isChallenging) => {
        this.props.closeOtherVotes('challenge-block')

        const res = {
            counterAction: this.props.counterAction,
            prevAction: this.props.prevAction,
            isChallenging,
            challengee: this.props.counterAction.source,
            challenger: this.props.name
        }
        console.log(res)
        this.props.socket.emit('g-blockChallengeDecision', res);
        this.props.doneBlockChallengeVote();
    }

    

    render() {

        const newActTranslated = {
            tax: "ເກັບພາສີ",
            assassinate: "ສັງຫານ",
            exchange: "ປ່ຽນໄພ້",
            steal: "ຍຶດຫຼຽນ",
            foreign_aid: "ຮັບເງິນຊ່ວຍເຫຼືອ",
            block_foreign_aid: "ປ້ອງກັນການຮັບເງິນຊ່ວຍເຫຼືອ",
            block_steal: "ປ້ອງກັນການຍຶດຫຼຽນ",
            block_assassinate: "ປ້ອງກັນການສັງຫານ",
            income: "ຮັບເງິນເດືອນ",
            coup: "ລັດຖະປະຫານ"
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

        function translatedAct(action){
            if(action === "tax"){
                return newActTranslated.tax;
            }
            if(action === "assassinate"){
                return newActTranslated.assassinate;
            }
            if(action === "exchange"){
                return newActTranslated.exchange;
            }
            if(action === "steal"){
                return newActTranslated.steal;
            }
            if(action === "block_foreign_aid"){
                return newActTranslated.block_foreign_aid;
            }
            if(action === "block_steal"){
                return newActTranslated.block_steal;
            }
            if(action === "block_assassinate"){
                return newActTranslated.block_assassinate;
            }
            if(action === "income"){
                return newActTranslated.income;
            }
            if(action === "coup"){
                return newActTranslated.coup;
            }
        }

        return (
            <>
                <p><b>{this.props.counterAction.source}</b> ກຳລັງຈະໃຊ້ <b>ການ{translatedAct(this.props.prevAction.action)}</b> ກັບ <b>{this.props.prevAction.source}</b> ດ້ວຍໄພ້ <b>{translatedCard(this.props.counterAction.claim)}</b></p>
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
