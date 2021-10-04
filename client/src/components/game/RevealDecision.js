import React, { Component } from 'react'
import './CoupStyles.css';

export default class RevealDecision extends Component {

    constructor(props) {
        super(props)

        this.act = this.props.res.isBlock ? this.props.res.counterAction.counterAction : this.props.res.action.action
        this.actionMap = {
            tax: ["duke"],
            assassinate: ["assassin"],
            exchange: ["ambassador"],
            steal: ["captain"],
            block_foreign_aid: ["duke"],
            block_steal: ["ambassador", "captain"],
            block_assassinate: ["contessa"],
        }
    }
    
    selectInfluence = (influence) => {
        console.log("select influences is",influence)
        // res.revealedCard, prevaction, counterAction, challengee, challenger, isBlock
        const res = {
            revealedCard: influence,
            prevAction: this.props.res.action,
            counterAction: this.props.res.counterAction,
            challengee: this.props.res.challengee,
            challenger: this.props.res.challenger,
            isBlock: this.props.res.isBlock
        }
        console.log(res)
        this.props.socket.emit('g-revealDecision', res);
        this.props.doneReveal();
    }


    

    render() {

        const CardImages = {
            duke: "https://cdn.discordapp.com/attachments/821027469028491269/893882361509449768/duke.jpg",
            assassin: "https://cdn.discordapp.com/attachments/821027469028491269/893882367289200701/assassin.jpg",
            captain: "https://cdn.discordapp.com/attachments/821027469028491269/893882370518818916/captain.jpg",
            ambassador: "https://cdn.discordapp.com/attachments/821027469028491269/893882364437069844/ambassador.jpg",
            contessa: "https://cdn.discordapp.com/attachments/821027469028491269/893882374188855326/contessa.jpg",
        };


        const newActTranslated = {
            tax: "ເກັບພາສີ",
            assassinate: "ສັງຫານ",
            exchange: "ປ່ຽນໄພ້",
            steal: "ຍຶດຫຼຽນ",
            block_foreign_aid: "ປ້ອງກັນການຮັບເງິນຊ່ວຍເຫຼືອ",
            block_steal: "ປ້ອງກັນການຍຶດຫຼຽນ",
            block_assassinate: "ປ້ອງກັນການສັງຫານ",
        }


        const newCardTranslated = {
            duke: "ຂຸນນາງ",
            assassin: "ມືສັງຫານ",
            ambassador: "ນັກການທູດ",
            captain: "ກັບຕັນ",
            contessa: "ຄອນເທສຊາ",
        }

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
        }


        const influences = this.props.influences.map((x, index) => {
            
            return <button className="card_button" id={x} key={index} onClick={() => this.selectInfluence(x)}>
                <div className="card_button_img_container">
                    <img src={CardImageTranslate(x)} alt={x} style={{borderRadius: 0}}/>
                    <p>{translatedCard(x)}</p>
                </div>
            </button>
        })

      

        return ( 
            <div>
                <p><b>ການ{translatedAct(this.act)}</b> ຂອງເຈົ້າຖືກທ້າທາຍ! ຖ້າເຈົ້າບໍ່ເປີດໄພ້ <b>{translatedCard(this.actionMap[this.act].join(' or '))}</b> ເຈົ້າຈະເສຍໄພ້ໄປ! ກະລຸນາເປີດໄພ້... </p>
                {influences}
            </div>
        )
    }
}
